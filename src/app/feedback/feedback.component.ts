import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router}from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  feedbackData: FormGroup;
  err_msg;
  err_flag;

  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.feedbackData = new FormGroup({
      'company_name': new FormControl(""),
      'job_role': new FormControl(""),
      'ctc': new FormControl(""),
      'work_location': new FormControl(""),
      'test_type': new FormControl(""),
      'tech_questions': new FormControl(""),
      'other_questions': new FormControl(""),
      'subjects': new FormControl(""), 
      'tips': new FormControl(""),
      'other_info': new FormControl(""),
   });
  }

  onSubmit(data){
    this.err_flag=false;
    console.log(data);
    if(data.company_name==="" || data.job_role===""||data.ctc===""||data.work_location==="" || data.test_type===""||data.tech_questions===""||data.other_questions==="" ||data.subjects===""||data.tips===""||data.other_info===""){
      this.err_msg="*Fields cannot be empty!";
      this.err_flag=true;
    }
    else{
      const feedback = {feedback: data};
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(feedback);
      console.log(body)
      this.http.post("http://localhost:8000/placement/feedbacks/",body,{'headers':headers}).subscribe(responseData=>{
        console.log(responseData);
        this.router.navigate(['/placement']);
      })
    }
  }

}