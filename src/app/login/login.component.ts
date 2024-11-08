import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  validation: any;
  loginstate:boolean=false;
  password:any;
  employeedata:any;

  @Output() send = new EventEmitter<{ validation: any; result: any }>();


  Login: any = {
    "employeeId": '',
  };
  constructor(private http: HttpClient) {}

  login()
  {
    console.log(this.Login.employeeId);
    this.http.post("http://localhost:8080/login",this.Login).subscribe((result:any)=>
    {
      console.log(result);
      console.log(this.password);
      if(result)
      {
        if(this.password==result.employeePassword && this.Login.employeeId==result.employeeId)
          {
            this.validation=false;
            this.landingPage(this.validation,result);
          }
          else{
            this.loginstate=true;
          }
      }
      else
      {
        this.loginstate=true;
      }

    })
  }
  landingPage(validation: any, result: any) {
    this.send.emit({ validation, result });
    console.log(result)
  }
}
