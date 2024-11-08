import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, LandingComponent, LoginComponent, HomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'LeaveSystem';
  LandingPageVisible:boolean=true;
  LoginVisible:boolean=false;
  NavbarVisibility:boolean=false;
  employeedata:any;
  displaylandingpage() 
  {
    this.LandingPageVisible=false;
    this.LoginVisible=true;
  }
  displayLoginPage(data:{ validation: any; result: any }) 
  {
    console.log("Event data:", data.validation);
    this.LoginVisible = data.validation;  
    this.NavbarVisibility=true;
    this.employeedata=data.result;
    console.log(this.employeedata)
  }
}
