import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-oncampus-list',
  templateUrl: './oncampus-list.component.html',
  styleUrls: ['./oncampus-list.component.css']
})
export class OncampusListComponent implements OnInit {
company_list=[];
data;
oncampus_flag;
  constructor(private http:HttpClient) { }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  ngOnInit(): void {
    this.oncampus_flag=false;
    const headers = { 'content-type': 'application/json'}  
     this.http.get("http://localhost:8000/company_list/",{'headers':headers}).subscribe(response_data=>{
      console.log(response_data);
      this.data=response_data;
      this.company_list=[];
      const curr_date = new Date();
      console.log(curr_date);
      const formatted_date = this.formatDate(curr_date);

      for(let i=0;i<this.data.list.length;i++) {
        console.log(this.data.list[i].visitingDate);
        if(this.data.list[i].visitingDate > formatted_date) 
          this.company_list.push({'company_name':this.data.list[i].companyName,'visiting_date':this.data.list[i].visitingDate});
        this.oncampus_flag=true;
      }
    })
   
  }
}

