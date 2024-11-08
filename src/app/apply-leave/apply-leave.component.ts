import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {
  recentLeaves: any;
  employeeId: any;
  teamLeaderId: any;
  id: any = { "employeeId": '' };

  leave = {
    leaveType: '',
    leaveStart: '',
    leaveEnd: '',
    leaveReason: '',
    leaveEmployeeId: '',
    teamLeaderId: ''
  };

  leaveTypes: string[] = ['Sick Leave', 'Casual Leave', 'Vacation Leave', 'Maternity Leave'];
  dateError: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']);
    });
    this.id = { "employeeId": this.employeeId };
    this.fetchEmployeeDetails();
  }

  onSubmit() {
    if (this.validateDates()) {
      this.leave.leaveEmployeeId = this.employeeId;
      this.leave.teamLeaderId = this.teamLeaderId;
      console.log(this.leave);
      
      this.http.post("http://localhost:8080/apply-leave", this.leave).subscribe({
        next: (result: any) => {
          console.log('Leave Applied:', result);
          this.resetForm();
        },
        error: (err: any) => {
          console.error('Error applying for leave:', err);
        }
      });
    }
  }

  validateDates(): boolean {
    const today = new Date();
    const startDate = new Date(this.leave.leaveStart);
    const endDate = new Date(this.leave.leaveEnd);

    if (startDate < today) {
      this.dateError = 'Start date cannot be in the past.';
      return false;
    }

    if (endDate < today) {
      this.dateError = 'End date cannot be in the past.';
      return false;
    }

    this.dateError = ''; // Clear any previous error
    return true;
  }

  resetForm() {
    this.leave = {
      leaveType: '',
      leaveStart: '',
      leaveEnd: '',
      leaveReason: '',
      leaveEmployeeId: this.employeeId,
      teamLeaderId: this.teamLeaderId
    };
  }

  fetchEmployeeDetails() {
    this.http.post("http://localhost:8080/login", this.id).subscribe((result: any) => {
      this.teamLeaderId = result.teamLeaderId;
    });
  }

  onLeaveStartChange() {
    this.validateDates();
  }

  onLeaveEndChange() {
    this.validateDates();
  }
}
