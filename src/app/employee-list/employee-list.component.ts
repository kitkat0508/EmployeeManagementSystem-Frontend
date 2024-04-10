import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees:Employee[]=[];
  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(
      (value)=>{
        this.employees=value;
      },
      (error)=>console.log(error)
    );

    this.employeeService.employeeAdded.subscribe(()=>{
      this.employeeService.getAllEmployees().subscribe(
        (value)=>{
          this.employees=value;
        },
        (error)=>console.log(error)
      )
    });
  }

}
