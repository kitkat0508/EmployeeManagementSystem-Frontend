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
  employeesFiltered:Employee[]=[];

  selectedFilter:string = "all";
  filterValue:string = "";

  departmentsList:string[] = [];
  designationList:string[] = [];

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(
      (value)=>{
        this.employees=value;
        this.getDropDownItems();
        this.useFilter();
      },
      (error)=>console.log(error)
    );

    this.employeeService.employeeAdded.subscribe(()=>{
      this.employeeService.getAllEmployees().subscribe(
        (value)=>{
          this.employees=value;
          this.getDropDownItems();
          this.useFilter();
        },
        (error)=>console.log(error)
      )
    });
  }

  useFilter():void{
    if(this.selectedFilter=="all"){
      this.employeesFiltered=this.employees;
    }

    else if(this.selectedFilter=="department"){
      this.employeesFiltered=this.employees.filter((employee)=>{
        return employee.department==this.filterValue;
      });
    }
    
    else{
      this.employeesFiltered=this.employees.filter((employee)=>{
        return employee.designation==this.filterValue;
      });
    }
  }

  getDropDownItems():void{
    this.departmentsList=Array.from(new Set(this.employees.map((employee)=>{
      return employee.department;
    })));

    this.designationList=Array.from(new Set(this.employees.map((employee)=>{
      return employee.designation;
    })));
  }

}
