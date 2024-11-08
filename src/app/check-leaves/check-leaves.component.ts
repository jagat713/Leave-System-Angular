import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-leaves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-leaves.component.html',
  styleUrls: ['./check-leaves.component.css']
})
export class CheckLeavesComponent {
  recentLeaves: any[] = [];
  employeeId: any;
  id: any = { "employeeId": '' };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']);
      this.id = { "employeeId": this.employeeId };
      console.log(this.employeeId);

      if (this.employeeId) {
        const employeeId = { employeeId: this.id.employeeId };
        console.log(employeeId);

        this.http.post("http://localhost:8080/all-leave", employeeId).subscribe(
          (result: any) => {
            this.recentLeaves = result;
            console.log(this.recentLeaves);
          },
          (error) => {
            console.error('Error fetching leave history:', error);
          }
        );
      } else {
        console.warn('No employee data or employeeId provided!');
      }
    });
  }

  deleteLeave(leaveId: number, index: number) {
    console.log(leaveId)
    this.http.delete(`http://localhost:8080/delete-leave?leaveId=${leaveId}`).subscribe(result => 
      {
        console.log(`Leave with ID ${leaveId} deleted successfully.`);
        this.recentLeaves.splice(index, 1);
      }
    );
  }
}
