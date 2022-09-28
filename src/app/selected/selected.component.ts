import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {
  data;
  msg;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json'}  
    this.http.get("http://localhost:8000/selected/",{'headers':headers}).subscribe(response_data=>{
      console.log(response_data);
      if(response_data['selectedCompany'] === 'None') {
        this.msg = 'You are not yet selected for any company!';
      }  
      else {
        this.data = response_data['selectedCompany'][0];
        console.log(this.data);
      }
    })
  }

}
