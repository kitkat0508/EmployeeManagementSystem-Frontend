import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


const routes: Routes = [
  {path:"",component:EmployeeAddComponent},
  {path:"list",component:EmployeeListComponent},
  {path:"employee",component:EmployeeDetailsComponent},
  {path:"employee/:employeeId",component:EmployeeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
