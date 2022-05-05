import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  @ViewChild('filter', {static: false}) login: TemplateRef<any>;
  showAvatar = false;
  sectiondialogRef: any;
  constructor(public appConfig: AppConfigService,private matDialog: MatDialog) { }

  ngOnInit(): void {
  }


  NavtoLogin(){
    this.openUserFormDialog();
    // this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
  }

  openUserFormDialog() {
    this.sectiondialogRef = this.matDialog.open(this.login, {
      width: '581px',
      height: '434px',
      panelClass: 'popupModalContainerForaddUser',
    });
  }

}