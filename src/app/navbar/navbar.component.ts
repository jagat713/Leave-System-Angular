import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  employeedata:any;
  @Input()data:any;
  employeeleaves:any=false;
  employeeId:any;
  employeeleavebalance:any;
  manager:any=false;
  employee:any=false;
  constructor(private router: Router){}
  ngOnInit()
  {
    this.employeedata=this.data;
    this.employeeId=this.data.employeeId
    this.employeeleavebalance=this.data.employeeleavebalance
    if(this.employeedata.employeeRole=="Employee")
    {
      this.employee=true;
    }
    if(this.employeedata.employeeRole=="TeamLeader")
    {
      this.employeeleaves=true;
      this.employee=true;
    }
    if(this.employeedata.employeeRole=="Manager")
    {
      this.manager=true;
    }
    if (this.employeeId) {
      this.router.navigate(['Home', this.employeeId]);
    }
  }

  logout() {
    window.location.href = "http://leavesystem.s3-website.ap-south-1.amazonaws.com"; // Redirect to a specific page
    setTimeout(() => {
        window.location.reload(); // Reload after redirection
    }, 500); // Small delay to allow redirection
}

}
