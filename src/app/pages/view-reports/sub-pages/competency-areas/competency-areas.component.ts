import { Component, Input, OnInit } from '@angular/core';
import { slide } from '../../../../animations'

@Component({
  selector: 'app-competency-areas',
  templateUrl: './competency-areas.component.html',
  styleUrls: ['./competency-areas.component.scss'],
  animations: slide
})
export class CompetencyAreasComponent implements OnInit {
  @Input() getAllReportsData;
  competancyData = [];
  areasName = [];
  counter: number = 0;
  list: any = [0];


  competenciesChartData = [];
  skillsChartData = [];
  competenciesName: any;
  unSortedVerticalData: any;
  unSortedHorizontalData: any;
  domain = ['#8ac1ed', '#a4dea5', '#f7d096', '#e89694', '#8ac1ed', '#a4dea5', '#f7d096', '#e89694', '#8ac1ed', '#a4dea5', '#f7d096', '#e89694', '#8ac1ed', '#a4dea5', '#f7d096', '#e89694'];
  verticaldomain = ["#FF8C00", "#0085B6" , "#9DBC5B" , "#28B59A", "#03B8CB", "#FF8C00", "#0085B6" , "#9DBC5B" , "#28B59A", "#03B8CB"];
  selectedHorizontalChartIndex = '0';
  verticalChartData: any[];
  constructor() {
  }

  ngOnInit(): void {
  this.getCompetancyData();
  }

  ngOnChanges() {
    this.getCompetancyData();
  }


  onSelect(event) {
  }

  getParticularCompetencySkills(e) {
    this.getHorizontalDataByCompetencyId(e);
  }

  getHorizontalDataByCompetencyId(id) {
    const selectedCompetency = this.competancyData.find((data: any)=> {
      if (data && data.competencyId == id) {
        return data;
      };
    });
    if (selectedCompetency) {
      const filterIndex = this.competancyData.findIndex(data => (data.competencyname == selectedCompetency.competencyname && data.score == selectedCompetency.score));
      this.counter = filterIndex != -1 ? filterIndex : this.counter;
    }
  }


  selectedHorizontalArrayIndex(event, i) {
    let skill = this.competancyData[i].skills.find((data: any)=> {
      if (data.skillname == event.name && data.score == event.value) {
        return data;
      }
    });
    this.getParticularAreaData(skill.area, i);
  }

  getParticularAreaData(area, i) {
    this.competancyData[i].areaSkills = [];
    this.competancyData[i].areaSkills = area;
  }

  getCompetancyData(){
    this.competancyData = this.getAllReportsData?.competencyDetails;
    if (this.competancyData && this.competancyData.length > 0) {
      this.getAreasDataInitialize(this.competancyData);
      this.setColorCodesToVericalChart();
    }
  }
  setColorCodesToVericalChart() {
    this.verticalChartData = [];
    let listCount = [];
    this.competancyData.forEach((element, j) => {
      listCount.push(j + 1);
      this.verticalChartData.push(element);
    });
    this.list = listCount;
    // Dummy variable is for testing purpose
    let dummy = [
      {
      areaColor: "#FF8C00",
      areaSkills: [],
      competencyId: "C013",
      competencyname: "Behavioral213",
      maxscore: 100,
      score: 23,
      skills: []
      },
      {
        areaColor: "#FF8C00",
        areaSkills: [],
        competencyId: "C013",
        competencyname: "Behaviorals",
        maxscore: 100,
        score: 53,
        skills: []
        },
        {
          areaColor: "#FF8C00",
          areaSkills: [],
          competencyId: "C013",
          competencyname: "1ehavioral213",
          maxscore: 100,
          score: 13,
          skills: []
          },
          {
            areaColor: "#FF8C00",
            areaSkills: [],
            competencyId: "C013",
            competencyname: "2Behaviorals",
            maxscore: 100,
            score: 23,
            skills: []
            }
    ]
    this.verticalChartData.forEach((element, i) => {
      if(element && element.score) {
        element.areaColor = this.verticaldomain[i];
      }
    });
    // this.verticalChartData.push(dummy[0]);
    // this.verticalChartData.push(dummy[1]);
    // this.verticalChartData.push(dummy[2]);
    // this.verticalChartData.push(dummy[3]);
  }
  getAreasDataInitialize(i) {
    this.competancyData.forEach(skills => {
      if (skills) {
        let areaSingle = [];
        skills.skills.forEach((area, i) => {
          if (area) {
          area.areaColor = this.domain[i];
          area.area.forEach(element => {
            element.areaColor = this.domain[i];
            areaSingle.push(element);
          });
        }
        });
        skills.areaSkills = areaSingle;
      }
    });
}

resetAreas(i, competency) {
  let areaSingle = [];
  this.competancyData[i].skills.forEach((area, i) => {
    if (area) {
    area.areaColor = this.domain[i];
    area.area.forEach(element => {
      element.areaColor = this.domain[i];
      areaSingle.push(element);
    });
  }
  });
  this.competancyData[i].areaSkills = areaSingle;
}

onNext() {
  if (this.counter != this.list.length - 1) {
    this.counter++;
  }
}

onPrevious() {
  if (this.counter > 0) {
    this.counter--;
  }
}

dotChange(i) {
  this.counter = i;
}

}
