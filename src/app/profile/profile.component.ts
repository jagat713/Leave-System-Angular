import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  employee = {
    employeeId: '',
    employeeLeaveBalance: '',
    employeePassword: '',
    employeeName: '',
    employeeRole: '',
    employeeEmail: ''
  };
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  employeeId: any;
  id = { "employeeId":''}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']);
    });

    this.id = { "employeeId": this.employeeId };

    this.fetchEmployeeDetails();
  }

  fetchEmployeeDetails() {
    this.http.post("http://localhost:8080/login", this.id).subscribe((result: any) => {
      this.employee=result;
    });
  }
  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
