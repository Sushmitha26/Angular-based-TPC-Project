import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData;
  err_flag;
  err_msg;
  userData = [];
  
  constructor(private router: Router, private http:HttpClient, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.loginData = new FormGroup({
      'usn': new FormControl(""),
      'password': new FormControl("")
   });


  //  const headers = { 'content-type': 'application/json'}  
  //   this.http.get("http://localhost:8000/users/",{'headers':headers}).subscribe(response_data=>{
  //     console.log(response_data);
  //   })

  }

  onSubmit(data) {
    this.err_flag=false;

    if(data.usn===""||data.password==="") {
      this.err_msg="*Fields cannot be empty!";
      this.err_flag=true;
    }
    else {
      const login = {login: data};
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(login);
      this.http.post("http://localhost:8000/login/",body,{'headers':headers}).subscribe(responseData=>{
        console.log(responseData);
        this.userData.push(responseData);
       let dataSource = [{'usn': responseData['usn'], 'email': responseData['email']}]
        if(responseData['status']==="failure") {
          this.err_msg="Incorrect password";
          this.err_flag=true;
        }
        else if(responseData['status']==="no_user") {
          this.err_msg="User is not registered";
          this.err_flag=true;
        }
        else {
          localStorage.setItem("dataSource", JSON.stringify(dataSource));
          this.userDataService.setData(this.userData);
          this.router.navigate(['placement']);
        }
      }) 
    }
  }

}
