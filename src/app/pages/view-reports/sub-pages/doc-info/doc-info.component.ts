import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.scss']
})
export class DocInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;

  profilePic: any;
  certificationList: any;
  constructor() { }

  ngOnInit(): void {
    this.getDocInfo();
  }

  ngOnChanges() {
    this.getDocInfo();
  }

  getDocInfo() {
    console.log('Docs', this.getAllReportsData);
    this.profilePic = this.getAllReportsData && this.getAllReportsData.profileImage ? this.getAllReportsData.profileImage : null;
    this.certificationList = this.getAllReportsData && this.getAllReportsData.certificationDetails && this.getAllReportsData.certificationDetails.length > 0 ? this.getAllReportsData.certificationDetails : null;
  }
}
