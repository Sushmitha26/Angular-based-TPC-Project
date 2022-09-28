import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPassword: FormGroup;
  err_msg;
  err_flag;
  reset_flag=false;
  error = null;
  uid;
  constructor(private router: Router, private http:HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.newPassword = new FormGroup({
      'password': new FormControl("", Validators.required),
      'password1': new FormControl("", Validators.required),
      'uid': new FormControl("")
   });
   this.uid = this.activatedRoute.snapshot.params.uidb64;
   console.log(this.uid);
  }

  onSubmit(data) {
    this.err_flag = false;
    this.reset_flag = false;
    const passwd_pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$";
    if(!data.password.match(passwd_pattern)) {
      this.err_msg="Password must contain minimum of 8 characters with atleast 1 uppercase,1 lowercase,1 digit and 1 special character!";
      this.err_flag=true;
    }
    if(data.password==="" || data.password1==="") {
      this.err_msg="*Fields cannot be empty!";
      this.err_flag=true;
    }
    else if(data.password!==data.password1) {
      this.err_msg="Passwords are not matching!";
      this.err_flag=true;
    }
    else {
      data.uid = this.uid;
      console.log(data);
      const newPasswd = {newPasswd: data};
      console.log(newPasswd);
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(newPasswd);
      this.http.patch("http://localhost:8000/update_password/",body,{'headers':headers}).subscribe(responseData=>{
        console.log(responseData)
      }, error => {
        this.error = error.message;
      }) 
      this.reset_flag=true;
    }
  }

}
