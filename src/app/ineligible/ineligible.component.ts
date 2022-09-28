import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ineligible',
  templateUrl: './ineligible.component.html',
  styleUrls: ['./ineligible.component.css']
})
export class IneligibleComponent implements OnInit {
  userData;
  usn;
  ineligible; 
  c_name;
  ineligible_flag;
  details_flag;
  public hideRuleContent:boolean[] = [];

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

      this.ineligible_flag = false;
      const usndata = {usnData: this.usn};
      const body=JSON.stringify(usndata);
      this.http.post("http://localhost:8000/placement/eligible/",body,{'headers':headers}).subscribe(responseData=>{
        console.log(responseData);
        this.ineligible = responseData;
        console.log(this.ineligible.ineligible);
        this.ineligible_flag = true;
      })
    })
  }

  view_details(data) {
    console.log(data);
    this.details_flag = true;
  }

}
