import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eligible',
  templateUrl: './eligible.component.html',
  styleUrls: ['./eligible.component.css']
})
export class EligibleComponent implements OnInit {
  userData;
  usn;
  eligible; 
  c_name;
  eligible_flag;
  details_flag;
  public register_flag:boolean[] = [];
  public hideRuleContent:boolean[] = [];
  //public buttonName:any = 'Expand';

  toggle(index) {
    // toggle based on index
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }

  constructor(private http: HttpClient, private router: Router) { }
  
  ngOnInit(): void {
    this.details_flag = false;
    const headers = { 'content-type': 'application/json'}  
    this.http.get("http://localhost:8000/session/",{'headers':headers}).subscribe(response_data=>{
      console.log(response_data);
      this.usn = response_data['user_usn'];
      //this.email = response_data['user_email'];

      this.eligible_flag = false;
      const usndata = {usnData: this.usn};
      const body=JSON.stringify(usndata);
      this.http.post("http://localhost:8000/placement/eligible/",body,{'headers':headers}).subscribe(responseData=>{
        console.log(responseData);
        this.eligible = responseData;
        console.log(this.eligible.eligible);
        this.eligible_flag = true;
      })
    })
  }

  view_details(data) {
    console.log(data);
    this.details_flag = true;
  }

  checkRegistration(cmp_name, index) {
    console.log(cmp_name);
    const headers = { 'content-type': 'application/json'} ;
    const reg_data = {usnData: this.usn, cmpData: cmp_name};
    const body=JSON.stringify(reg_data);
    this.http.post("http://localhost:8000/check_registration/",body,{'headers':headers}).subscribe(responseData=>{
        console.log(responseData);
        if(responseData['status'] == 'Registered') {
          this.register_flag[index] = !this.register_flag[index];
        }
        else {
          this.router.navigate(['/company registration/' + cmp_name]);
        }
      })
  }

}
