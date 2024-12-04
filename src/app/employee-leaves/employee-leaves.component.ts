import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-leaves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.css']
})
export class EmployeeLeavesComponent {
  recentLeaves: any[] = [];
  employeeId: any; 

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the employeeId from the route params
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']);
      this.getLeavesByTeamLeader();
    });
  }

  getLeavesByTeamLeader() {
    this.http.get(`http://localhost:8080/GetLeavesByTeamLeader?teamLeaderId=${this.employeeId}`).subscribe(
      (result: any) => {
        console.log(result); 
        this.recentLeaves = result; 
      },
      (error) => {
        console.error('Error fetching leave data:', error); 
      }
    );
  }

  rejectLeave(leaveId: number) {
    this.http.post(`http://localhost:8080/Reject?leaveId=${leaveId}`, {}).subscribe(
      (result) => {
        console.log('Leave rejected successfully:', result);
        this.getLeavesByTeamLeader()
        this.ngOnInit()
      }
    );
  }
  
  escalateLeave(leaveId: number) {
    this.http.post(`http://localhost:8080/Esclate?leaveId=${leaveId}`, {}).subscribe(
      (result) => {
        console.log('Leave escalated successfully:', result);
        this.ngOnInit()
      }
    );
  }
}
