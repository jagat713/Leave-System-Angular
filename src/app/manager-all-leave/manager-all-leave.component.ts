import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-all-leave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-all-leave.component.html',
  styleUrl: './manager-all-leave.component.css'
})
export class ManagerAllLeaveComponent {
leaves: any[]=[];
constructor(private http: HttpClient) {}
ngOnInit()
{
  this.http.get("http://localhost:8080/ManagerAllLeaves").subscribe((result:any)=>
  {
    this.leaves=result
  })
}
approveLeave(leaveEmployeeId:number,leaveId: number, leaveStart: string, leaveEnd: string): void {
  const startDate = new Date(leaveStart);
  const endDate = new Date(leaveEnd);
  const diffInMs = endDate.getTime() - startDate.getTime();
  const totalLeaveDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
  this.http.get(`http://localhost:8080/ApproveLeave?EmployeeId=${leaveEmployeeId}&LeaveId=${leaveId}&noofleaves=${totalLeaveDays}`,{responseType: 'text' }).subscribe((result:any)=>
  {
    
    if(result)
    {
      console.log(result);
      this.ngOnInit();
    }
  })
}
rejectLeave(leaveId:number) {
  this.http.post(`http://localhost:8080/Reject?leaveId=${leaveId}`, {}).subscribe(
    (result) => {
      console.log('Leave rejected successfully:', result);
      this.ngOnInit()
    }
  );
}

}
