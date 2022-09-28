import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  data;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json'}  
    this.http.get("http://localhost:8000/session/",{'headers':headers}).subscribe(response_data=>{
      this.data = response_data['selectedCompany'][0];
      console.log(this.data);
    })
  }

}
