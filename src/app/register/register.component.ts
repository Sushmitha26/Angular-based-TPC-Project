import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router}from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: FormGroup;
  err_msg;
  err_flag;

  constructor(private router: Router, private http:HttpClient) {}

  ngOnInit(): void {
    this.userData = new FormGroup({
      'email': new FormControl(""),
      'usn': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'password1': new FormControl("", Validators.required)
   });

  }

  onSubmit(data) {
      this.err_flag=false;
      const passwd_pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$";
      const usn_pattern="^4NI.+";
      console.log(data);
      if(data.email==="" || data.usn===""||data.password===""||data.password===""){
        this.err_msg="*Fields cannot be empty!";
        this.err_flag=true;
      }
      else if(data.password!==data.password1) {
        this.err_msg="Passwords are not matching!";
        this.err_flag=true;
      }
      else if(!data.usn.match(usn_pattern)) {
        this.err_msg="Enter correct USN!";
        this.err_flag=true;
      }
      else if(!data.password.match(passwd_pattern)) {
        this.err_msg="Password must contain minimum of 8 characters with atleast 1 uppercase,1 lowercase,1 digit and 1 special character!";
        this.err_flag=true;
      }
      else {
        const user = {user: data};
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(user);
        console.log(body)
        this.http.post("http://localhost:8000/users/",body,{'headers':headers}).subscribe(responseData=>{
          console.log(responseData);
          const status=responseData['status'];
          if(status=="user_exists") {
            this.err_msg="User already exists!";
            this.err_flag=true;
          }
          else {
            this.router.navigate(['/']);
          }

        })
      }
    }
}

