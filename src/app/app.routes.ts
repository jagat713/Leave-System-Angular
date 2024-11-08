import { Routes } from '@angular/router';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { CheckLeavesComponent } from './check-leaves/check-leaves.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    {
        path:'Home/:id',
        component:HomeComponent 
    },
    {
        path: 'ApplyLeave/:id',
        component:ApplyLeaveComponent
    },
    {
        path:'CheckLeave/:id',
        component:CheckLeavesComponent
    },
    {
        path:'EmployeeLeaves/:id',
        component:EmployeeLeavesComponent
    },
    {
        path:'Login',
        component:LoginComponent
    },
    {
        path:'Landing',
        component:LandingComponent
    },
    {
        path:'',
        component:LandingComponent
    },
    {
        path:'Profile/:id',
        component:ProfileComponent
    },
    {
        path:'**',
        component:ErrorComponent
    },
];
