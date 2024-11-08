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
  constructor(private router: Router){}
  ngOnInit()
  {
    this.employeedata=this.data;
    this.employeeId=this.data.employeeId
    if(this.employeedata.employeeRole=="TeamLeader")
    {
      this.employeeleaves=true;
    }
    if (this.employeeId) {
      this.router.navigate(['Home', this.employeeId]);
    }
  }
  logout() {
    window.location.reload();
  }
}
