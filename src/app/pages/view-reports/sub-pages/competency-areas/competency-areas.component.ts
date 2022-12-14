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
  domain = ['#FFC4A3', '#FFBC43', '#C84557', '#BAD252', '#2F9E77', '#1E9FAA', '#C89072', '#786965', '#5F5C5A', '#A889DF', '#AD7CA4', '#847EA6', '#6E87B2', '#8D8C88', '#EF9E6D', '#D29999','#1E94BE'];
  verticaldomain = ['#FFC4A3', '#FFBC43', '#C84557', '#BAD252', '#2F9E77', '#1E9FAA', '#C89072', '#786965', '#5F5C5A', '#A889DF', '#AD7CA4', '#847EA6', '#6E87B2', '#8D8C88', '#EF9E6D', '#D29999','#1E94BE','#FFC325','#FFA2A2'];
  selectedHorizontalChartIndex = '0';
  verticalChartData: any[];
  isCompeShow = true;
  constructor() {
  }

  ngOnInit(): void {
  // this.getCompetancyData();
  
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
      if (data && data.competencyname == id) {
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
      this.convertToPercentage();
      this.getAreasDataInitialize(this.competancyData);
      this.setColorCodesToVericalChart();
    }
  }

  convertToPercentage() {
    this.competancyData.forEach(element => {
      if(parseInt(element.score) > 0 && element.competencyname != '' && element.competencyname != 'NA'){
        if (element.score && element.maxscore) {
          element.actualScore = element.score;
          element.score = this.conversionFormula(element.score, element.maxscore);
        }
        element.skills.forEach(skills => {
          if(parseInt(skills.score) > 0 && skills.skillname != '' && skills.skillname != 'NA'){
            if (skills.score && skills.maxscore) {
              skills.actualScore = skills.score;
              skills.score = this.conversionFormula(skills.score, skills.maxscore);
            }
          skills.area.forEach(area => {
            if (area.score && area.maxscore) {
              area.actualScore = area.score;
              area.score = this.conversionFormula(area.score, area.maxscore);
            }
          });
          }else{
            this.isCompeShow = false;
          }

        });
      }else{
        this.isCompeShow = false;
      }

    });
  }

  conversionFormula(score: number, maxscore: number) {
    let percentage: number = Number(score) / Number(maxscore) * 100;
    percentage = Number(percentage.toFixed(2));
    return Number.isInteger(percentage) ? percentage : percentage.toFixed(2);
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
    // let dummy = this.getDummyData();
    this.verticalChartData.forEach((element, i) => {
      if(element && element.score) {
        element.areaColor = this.verticaldomain[i];
      }
    });
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
            if(element.areaname == 'NA'){
                element.areaname = 'XXXX';
                this.isCompeShow = false;
            }
            areaSingle.push(element);
          });
        }
        });
        skills.areaSkills = areaSingle;
      }
    });
}

resetAreas(i, competency) {
  // this.getCompetancyData();
  // let areaSingle = [];
  // this.competancyData[i].skills.forEach((area, i) => {
  //   if (area) {
  //   area.areaColor = this.domain[i] ? this.domain[i] : '';
  //   area.area.forEach(element => {
  //     element.areaColor = this.domain[i] ? this.domain[i] : '';
  //     areaSingle.push(element);
  //   });
  // }
  // });
  //   this.competancyData[i].areaSkills = areaSingle;

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
