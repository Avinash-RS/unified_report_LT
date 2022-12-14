
import { APP_CONSTANTS } from './../utils/app-constants.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../utils/app-config.service';
import * as CryptoJS from 'crypto-js';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = environment.API_BASE_URL;
  EDGE_URL = environment.NODE_EDGE_URL;
  Prourl = environment.NODE_URL;
  EncryptKEY = environment.encryptionKey;

  filterSubject: Subject<any> = new Subject();
  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,

  ) { }

  logout() {
    this.appConfig.clearLocalStorage();
    this.appConfig.clearSessionStorage();
    return this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LANDING);
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/candidatelogin`, data);
  }

  getReportsDataAPI(data) {
    return this.http.post(`${this.BASE_URL}/getunifiedReport`, data);
  }

  getReportsData(data) {
    return this.http.get('../../assets/json/reports.json');
  }

  getUserList(data) {
    // return this.http.post(`${this.BASE_URL}/getuserList`, data);
  }

  getDriveBaisedUser(data) {
    return this.http.post(`${this.BASE_URL}/driveCandidateList`, data);
  }

  encrypt(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.EncryptKEY).toString();
    } catch (e) {
      console.log(e);
      return data;
    }
  }

  decrypt(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.EncryptKEY);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
      return data;
    }
  }

  getSectionWiseDetails(data){
    return this.http.post(`${this.BASE_URL}/sectionwiseScoreDetails`, data);
  }

  getProctorVideo(data){
    return this.http.post(`${this.Prourl}/getProctorVideobyUserRoomId`, data);
  }

  getHiringReport(data){
    return this.http.post(`${this.BASE_URL}/getAgegridReportList`,data,
    { reportProgress: true });
    
  }

  getBehaviourReport(data){
    return this.http.post(`${this.BASE_URL}/getBehaviouralReportContent `,data);
  }

  getCandidateSkills(email){
    return this.http.post(`${this.BASE_URL}/getCandidateRecommendedJobs `,email);
  }

  getCertificateDetails(certificateCode){
    return this.http.get(`${this.BASE_URL}/getCandidateVerificationDetails?certificationID=${certificateCode}`);
   }

  getCandidatefilters(data){
    return this.http.post(`${this.BASE_URL}/getCandidatefilters`,data,
    { reportProgress: true });
  }

  getcandidateList(data){
    return this.http.post(`${this.BASE_URL}/getCandidateList`,data);
  }

  // Assessment Analytics Report Api 
  getTestSummary(data){
    return this.http.post(`${this.BASE_URL}/getTestSummary`,data);
  }

  getTestDetails(data){
  return this.http.post(`${this.BASE_URL}/getTestDetails`,data);
  } 

  getTestSummaryCard(data){
    return this.http.post(`${this.BASE_URL}/getTestSummaryCard`,data);
  }

  getSectionAnalysis(data){
    return this.http.post(`${this.BASE_URL}/getSectionAnalysis`,data);
  }

  getTopicAnalysis(data){
    return this.http.post(`${this.BASE_URL}/getTopicAnalysis`,data);
  }

  getTaxonomyAnalysis(data){
    return this.http.post(`${this.BASE_URL}/getTaxonomyAnalysis`,data);
  }
  getComplexityAnalysisForTest(data){
    return this.http.post(`${this.BASE_URL}/getComplexityAnalysisForTest`,data);
  }

  getTimeSpentAnalysis(data){
    return this.http.post(`${this.BASE_URL}/getTimeSpentAnalysis`,data);
  }

  getSectionWiseComplexityAnalysis(data){
    return this.http.post(`${this.BASE_URL}/getSectionWiseComplexityAnalysis`,data);
  }
  getComplexityForTopicAnalysis(data){
    return this.http.post(`${this.BASE_URL}/getComplexityForTopicAnalysis`,data);
  }
  getTaxonomyWiseComplexityAnalysis(data){
    return this.http.post(`${this.BASE_URL}/getTaxonomyWiseComplexityAnalysis`,data);
  }

  postRegister(data){
    return this.http.post(`${this.BASE_URL}/employeeRegister`,data);
  }

  getSkillMasterList(data){
    return this.http.post(`${this.BASE_URL}/getSkillList`,data,
    { reportProgress: true });
  }

  skillMasterValidate(data){
    return this.http.post(`${this.BASE_URL}/skillValidate`,data);
  }

  skillUploadValidator(data){
   return this.http.post(`${this.BASE_URL}/skillUploadValidator`,data);
  }
  
  partnerfooterlist(){
    return this.http.post(`${this.BASE_URL}/partnerfooterlist`,{});
  }
  
}
