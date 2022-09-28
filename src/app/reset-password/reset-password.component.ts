import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetData;
  err_msg;
  err_flag;
  reset_flag = false;

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.resetData = new FormGroup({
      'email': new FormControl("", Validators.required)
   });
  }

  onSubmit(data) {
    if(data.email==="") {
      this.err_msg="*Fields cannot be empty!";
      this.err_flag=true;
    }
    else {
      const reset = {reset: data};
      console.log(reset);
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(reset);
      this.http.post("http://localhost:8000/password_reset/",body,{'headers':headers}).subscribe(responseData=>{
        console.log(responseData)
      }) 
      this.reset_flag = true;
    }
  }

}
