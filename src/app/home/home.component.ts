import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ShowDataTable:any=false;
  LeaveBalance: any;
  Name: any;
  employeeId: any;
  employeeRole:any;
  employee:any=false
  ManagerRole:any=false;
  id: any = { "employeeId": '' };
  recentLeavesList: any[] = [];
  leaveRecords: any[]=[];
  selectedDate: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']);
    });
    this.id = { "employeeId": this.employeeId };
    this.fetchEmployeeDetails();
    this.fetchLeaveHistory();
  }

  fetchEmployeeDetails() {
    this.http.post("http://localhost:8080/login", this.id).subscribe((result: any) => {
      this.LeaveBalance = result.employeeLeaveBalance;
      this.Name = result.employeeName;
      this.employeeRole=result.employeeRole;
      if(this.employeeRole=="Employee")
      {
        this.employee=true;
      }
      if(this.employeeRole=="TeamLeader")
        {
          this.employee=true;
        }
      if(this.employeeRole=="Manager")
      {
        this.ManagerRole=true;
      }
    });
  }

  fetchLeaveHistory() {
    this.http.post("http://localhost:8080/all-leave", this.id).subscribe(
      (result: any) => {
        if (result && result.length > 0) {
          this.recentLeavesList = result.slice(-5).reverse();
        }
      },
    );
  }
  onDateChange() {
    this.http.get(`http://localhost:8080/approved-leaves?date=${this.selectedDate}`).subscribe(
      (result:any) => {
        this.leaveRecords = result;
        console.log(this.leaveRecords);
        this.ShowDataTable=true;
      }
    );
  }
}
