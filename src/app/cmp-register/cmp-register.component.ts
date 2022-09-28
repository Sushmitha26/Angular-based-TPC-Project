import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cmp-register',
  templateUrl: './cmp-register.component.html',
  styleUrls: ['./cmp-register.component.css']
})
export class CmpRegisterComponent implements OnInit {
  registrationData;
  usn;
  email;
  name;
  dob;
  email1;
  tenth_percent;
  twelve_percent;
  gender;
  cgpa;
  resume;
  phone;
  cmp_name;
  profileData;
  session_flag;
  studentData;
  constructor(private http:HttpClient, 
    private router: Router, private activatedRoute: ActivatedRoute) {} 

ngOnInit(): void {
  this.session_flag = false;
  this.registrationData = new FormGroup({
    'resume': new FormControl("", Validators.required)
  });

  this.cmp_name = this.activatedRoute.snapshot.params.companyName;

  const headers = { 'content-type': 'application/json'}  
  this.http.get("http://localhost:8000/session/",{'headers':headers}).subscribe(response_data=>{
    console.log(response_data);
    this.profileData = response_data['profileData'][0];
    
    this.usn = response_data['user_usn'];
    this.email = response_data['user_email'];
    this.dob = this.profileData['dob'];
    this.email1 = this.profileData['email1'];
    this.name = this.profileData['name'];
    this.gender = this.profileData['gender'];
    this.tenth_percent = this.profileData['tenth_percent'];
    this.twelve_percent = this.profileData['twelve_percent'];
    this.cgpa = this.profileData['cgpa'];
    this.phone = this.profileData['phone'];

    this.session_flag = true;
  })
  console.log(this.email,this.usn); 
  
  }

  onSubmit(data) {
    console.log(data)
    this.studentData = {'email': this.email, 'usn': this.usn, 'name': this.name, 'dob': this.dob, 'gender': this.gender, 'email1': this.email1, 'phone': this.phone, 'tenth_percent': this.tenth_percent, 'twelve_percent': this.twelve_percent, 'cgpa': this.cgpa, 'resume': data.resume};
    console.log(this.studentData)
    const studentdata = {studentdata: this.studentData, 'cmp_name': this.cmp_name};
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(studentdata);
    this.http.post("http://localhost:8000/cmp_registration/",body,{'headers':headers}).subscribe(responseData=>{
      console.log(responseData);
      
      this.router.navigate(['/placement']);
    })
  }

}
