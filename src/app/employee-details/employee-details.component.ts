import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee,employees } from '../model/Employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const employeeIdFromRoute = Number(routeParams.get('employeeId'));

    this.employee = employees.find((employee)=>{
      return employee.employeeId==employeeIdFromRoute;
    });
  }

}
