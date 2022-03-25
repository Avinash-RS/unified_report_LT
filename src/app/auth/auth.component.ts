import { ApiService } from './../services/api.service';
import { AppConfigService } from './../utils/app-config.service';
import { APP_CONSTANTS } from './../utils/app-constants.service';
import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { SentDataToOtherComp } from '../services/sendDataToOtherComp.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('matDialog', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('sidenav') sidenav: MatSidenav;
  appConstant = APP_CONSTANTS.ENDPOINTS;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isaccess: boolean;
  userDetails: any;
  username: any;
  InAppReport: string;
  subscription: Subscription;
  orgdetails: any;
  orgLogo: any;
  orgName: any;

  constructor(
    private appConfig: AppConfigService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private sendData: SentDataToOtherComp,
    private toastr: ToastrService,
  ) {

    this.subscription = this.sendData.getMessage().subscribe(message => {
      this.InAppReport = message;
    });
   }

  ngOnInit(): void {
    this.userDetails  =   JSON.parse(sessionStorage.getItem('user'));
    if(this.userDetails){
      this.username = this.userDetails.attributes.firstName;
    }

    this.orgdetails = JSON.parse(this.appConfig.getLocalStorage('role'));
    this.orgLogo = this.orgdetails[0].logoUrl;
    this.orgName = this.orgdetails[0].orgName;
    this.isaccess = this.appConfig.isComingFromMicroCert();
  }

  logout() {
    this.apiService.logout();
    this.toastr.warning('You have been logged out successfully');
  }

  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '500px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms'
    });
  }

  // closeDialog(e) {
  //   if (e == 'save') {
  //     this.dialog.closeAll();
  //     this.logout();
  //   } else {
  //     this.dialog.closeAll();
  //   }
  // }

  mouseenter() {
    if (!this.isExpanded) {
      // this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      // this.isShowing = false;
    }
  }


       /**
   * Listen and display the loading spinner.
   */

}
