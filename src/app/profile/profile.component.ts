import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email;
  usn;
  err_flag=false;
  err_msg=false;
  userData;
  profileData: FormGroup;
  session_flag=false;

  constructor(private http:HttpClient, 
              private userDataService: UserDataService,
              private router: Router) {} 

  ngOnInit(): void {
    this.session_flag = false;
    this.profileData = new FormGroup({
      'name': new FormControl("", Validators.required),
      'dob': new FormControl("", Validators.required),
      'gender': new FormControl("", Validators.required),
      'email1': new FormControl("", Validators.required),
      'phone': new FormControl("", Validators.required),
      'phone1': new FormControl("", Validators.required),
      'p_phone': new FormControl("", Validators.required),
      'address': new FormControl("", Validators.required),
      'p_address': new FormControl("", Validators.required),
      'tenth_percent': new FormControl("", Validators.required),
      'tenth_board': new FormControl("", Validators.required),
      'tenth_institute': new FormControl("", Validators.required),
      'tenth_year': new FormControl("", Validators.required),
      'twelve_percent': new FormControl("", Validators.required),
      'twelve_board': new FormControl("", Validators.required),
      'twelve_institute': new FormControl("", Validators.required),
      'twelve_year': new FormControl("", Validators.required),
      'entryMode': new FormControl('', Validators.required),
      'rank': new FormControl("", Validators.required),
      'branch': new FormControl("", Validators.required),
      'first_sem_sgpa': new FormControl("", Validators.required),
      'first_sem_percent': new FormControl("", Validators.required),
      'second_sem_sgpa': new FormControl("", Validators.required),
      'second_sem_percent': new FormControl("", Validators.required),
      'third_sem_sgpa': new FormControl("", Validators.required),
      'third_sem_percent': new FormControl("", Validators.required),
      'fourth_sem_sgpa': new FormControl("", Validators.required),
      'fourth_sem_percent': new FormControl("", Validators.required),
      'fifth_sem_sgpa': new FormControl("", Validators.required),
      'fifth_sem_percent': new FormControl("", Validators.required),
      'sixth_sem_sgpa': new FormControl("", Validators.required),
      'sixth_sem_percent': new FormControl("", Validators.required),
      'seventh_sem_sgpa': new FormControl(""),
      'seventh_sem_percent': new FormControl(""),
      'eigth_sem_sgpa': new FormControl(""),
      'eigth_sem_percent': new FormControl(""),
      'cgpa': new FormControl("", Validators.required),
      'cgpa_percent': new FormControl("", Validators.required),
      'credits': new FormControl("", Validators.required),
      'mute': new FormControl("", Validators.required),
      'arrears': new FormControl("", Validators.required)

   });

    // this.userData = JSON.parse(localStorage.getItem("dataSource"));
    // console.log(this.userData);
    const headers = { 'content-type': 'application/json'}  
    this.http.get("http://localhost:8000/session/",{'headers':headers}).subscribe(response_data=>{
      console.log(response_data);
      this.usn = response_data['user_usn'];
      this.email = response_data['user_email'];
    })
    console.log(this.email,this.usn); 
    this.session_flag = true;
  }

  get f() {
    return this.profileData.controls;
  }

  onSubmit(data) {
    data.usn = this.usn;
    data.email = this.email;
    const profile = {profile: data};
    //console.log(profile)
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(profile);
    console.log(body)
    this.http.post("http://localhost:8000/placement/profile/",body,{'headers':headers}).subscribe(responseData=>{
      console.log(responseData);
      this.router.navigate(['/placement']);
    })
  } 

}
