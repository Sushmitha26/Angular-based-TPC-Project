import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData = [];
  constructor(private http: HttpClient) { }

  setData(data) {
    this.userData = data;
  }

  getData() {
    console.log(this.userData);
    return this.userData;
  }

  fetchData() {
    const headers = { 'content-type': 'application/json'}
    this.http.get('http://localhost:8000/login/').subscribe(response_data=>{
      console.log(response_data);
      this.userData.push(response_data);
      console.log(this.userData);
    })
    return this.userData;
  }
}
