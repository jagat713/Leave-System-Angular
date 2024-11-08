import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-leaves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-leaves.component.html',
  styleUrl: './employee-leaves.component.css'
})
export class EmployeeLeavesComponent {
  leaves = [
    {
      leaveId: 1,
      leavetype:'Sick',
      status: 'Pending',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-05'),
      reason: 'Medical leave',
    },
  ];
  employeeId: any;
  id: any = { "employeeId": '' };
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']); 
    });
    this.http.get("",this.id).subscribe(result=>
    {

    }
    );
  }
  rejectLeave(leaveId: number) {
    console.log(`Leave ID ${leaveId} rejected`);
  }

  escalateLeave(leaveId: number) {
    console.log(`Leave ID ${leaveId} escalated`);
  }
}
