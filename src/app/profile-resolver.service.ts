import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserDataService } from "./user-data.service";
import { LoginComponent } from './login/login.component';


@Injectable({providedIn: 'root'})
export class ProfileResolverService implements Resolve<any> {
  userdata = [];
  constructor(private userDataService: UserDataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.userdata = this.userDataService.getData();
    console.log(this.userdata);

    if(this.userdata.length === 0) {
      this.userdata = this.userDataService.fetchData();
      console.log(this.userdata);
      return this.userdata;
    }
    else {
      return this.userdata; 
    }
  }
}