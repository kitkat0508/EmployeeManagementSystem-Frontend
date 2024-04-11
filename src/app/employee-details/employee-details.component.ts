import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { EmployeeService } from '../employee.service';
import { Employee,employees } from '../model/Employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined;
  employeeDetails: FormGroup;
  employeeIdField: number | undefined;
  constructor(private fb:FormBuilder,private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeDetails = this.fb.group({
      employeeId: ['', Validators.required],
    });

    this.employeeDetails.get('employeeId').valueChanges.pipe(
      debounceTime(500)
    ).subscribe((employeeId) => {
      //console.log(employeeId);
      this.employeeIdField=employeeId;
      this.findEmployeeById(this.employeeIdField);
    });

  }

  findEmployeeById(employeeId:number){
      if(employeeId==null){
        employeeId=0;
      }
      this.employeeService.getEmployeeById(employeeId).subscribe(
        (employee)=>this.employee=employee,
        (error) => console.error(error)
      )
  }

  updateEmployee(){
    if(!this.employee){
      return;
    }
    this.employeeService.updateEmployee(this.employee).subscribe(
      (value)=>{
        console.log("Employee Updated",value);
        this.employeeService.announceEmployeeAdded();
      },
      (error)=>console.log(error)
    );
    this.employeeDetails.reset();
  }

}
