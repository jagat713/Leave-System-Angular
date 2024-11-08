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
  LeaveBalance: any;
  Name: any;
  employeeId: any;
  id: any = { "employeeId": '' };
  recentLeavesList: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']);
    });

    this.id = { "employeeId": this.employeeId };

    this.fetchEmployeeDetails();
    this.fetchLeaveHistory();
  }

  // Fetch employee details
  fetchEmployeeDetails() {
    this.http.post("http://localhost:8080/login", this.id).subscribe((result: any) => {
      this.LeaveBalance = result.employeeLeaveBalance;
      this.Name = result.employeeName;
    });
  }

  fetchLeaveHistory() {
    this.http.post("http://localhost:8080/all-leave", this.id).subscribe(
      (result: any) => {
        if (result && result.length > 0) {
          this.recentLeavesList = result.slice(-5).reverse();
        }
      },
      (error) => {
        console.error('Error fetching leave history:', error);
      }
    );
  }
}
