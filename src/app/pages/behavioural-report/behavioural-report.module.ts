import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviouralReportRoutingModule } from './behavioural-report-routing.module';
import { BehaviouralLandingPageComponent } from './behavioural-landing-page/behavioural-landing-page.component';
import { BehaviouralReportCanvasComponent } from './behavioural-report-canvas/behavioural-report-canvas.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    BehaviouralLandingPageComponent,
    BehaviouralReportCanvasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BehaviouralReportRoutingModule,
    ChartsModule
  ],
})
export class BehaviouralReportModule { }
