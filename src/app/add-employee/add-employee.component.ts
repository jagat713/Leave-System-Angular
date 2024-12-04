import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  private baseUrl = environment.baseUrl;
  employee = {
    "employeeName": "",
    "employeeRole": "",
    "employeeEmail": "",
    "employeePassword": "",
    "employeeLeaveBalance": "",
    "teamLeaderId": ""
}
status:any=false;
constructor(private http:HttpClient){}

  onSubmit() {
    console.log(this.employee)
    this.http.post(`${this.baseUrl}/AddEmployee`, this.employee).subscribe((result:any)=>
      {
        this.status=result;
        console.log("Employee Added", result);
      })
  }
}
