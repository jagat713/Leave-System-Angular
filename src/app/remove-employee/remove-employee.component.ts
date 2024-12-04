import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-remove-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './remove-employee.component.html',
  styleUrl: './remove-employee.component.css'
})
export class RemoveEmployeeComponent {
  private baseUrl = environment.baseUrl;
  employeeId:any;
  message: string = '';
  success: boolean = false;

  constructor(private http: HttpClient) {}

  onRemoveEmployee() {
    if (this.employeeId !== null) 
    {
      this.http.delete(`${this.baseUrl}/RemoveEmployee?employeeid=${this.employeeId}`).subscribe((result:any) => 
      {
        this.success = true;
        this.message = 'Employee removed successfully.';
        });
    }
  }
}
