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
  employeeLeavebalance:any;
  teamLeaderId: any;
  employeename:any;
  successmessage:any;
  id: any = { "employeeId": '' };

  leave = {
    leaveType: '',
    leaveStart: '',
    leaveEnd: '',
    leaveReason: '',
    leaveEmployeeId: '',
    teamLeaderId: '',
    leaveEmployeeName:''
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
      this.leave.leaveEmployeeName=this.employeename;
      console.log(this.leave);
      
      this.http.post("http://localhost:8080/apply-leave", this.leave).subscribe({
        next: (result: any) => {
          console.log('Leave Applied:', result);
          this.resetForm();
          this.successmessage=true
        },
        error: (err: any) => {
          console.error('Error applying for leave:', err);
        }
      });
    }
  }

  
  

  resetForm() {
    this.leave = {
      leaveType: '',
      leaveStart: '',
      leaveEnd: '',
      leaveReason: '',
      leaveEmployeeId: this.employeeId,
      teamLeaderId: this.teamLeaderId,
      leaveEmployeeName:this.employeename
    };
  }

  fetchEmployeeDetails() {
    this.http.post("http://localhost:8080/login", this.id).subscribe((result: any) => {
      this.teamLeaderId = result.teamLeaderId;
      this.employeeLeavebalance=result.employeeLeaveBalance;
      this.employeename=result.employeeName;
    });
  }

  onLeaveStartChange() {
    this.validateDates();
  }

  onLeaveEndChange() {
    this.validateDates();
  }
  validateDates(): boolean {
    const today = new Date();
    const startDate = new Date(this.leave.leaveStart);
    const endDate = new Date(this.leave.leaveEnd);
  
    if (this.employeeLeavebalance <= 0) {
      this.dateError = 'You do not have any leave balance remaining.';
      return false;
    }
  
    if (startDate < today) {
      this.dateError = 'Start date cannot be in the past.';
      return false;
    }
    if (endDate < today) {
      this.dateError = 'End date cannot be in the past.';
      return false;
    }
  
    const timeDiff = endDate.getTime() - startDate.getTime();
    const leaveDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  
    if (leaveDays > this.employeeLeavebalance) {
      this.dateError = `You only have ${this.employeeLeavebalance} leave days remaining, but selected dates require ${leaveDays} days.`;
      return false;
    }
    this.dateError = '';
    return true;
  }
}
