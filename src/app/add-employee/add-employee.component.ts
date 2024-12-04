import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
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
    this.http.post("http://localhost:8080/AddEmployee", this.employee).subscribe((result:any)=>
      {
        this.status=result;
        console.log("Employee Added", result);
      })
  }
}
