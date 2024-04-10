import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/Employee';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  employees: Employee[];
  emailFlag:Boolean=false;
  contactFlag:Boolean=false;
 
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }
 
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      designation: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.emailFlag=false;
    this.contactFlag=false;
    // Debounce email and contact number changes and make service calls
    this.employeeForm.get('email').valueChanges.pipe(
      debounceTime(500)
    ).subscribe((email) => {
      console.log(email);
      
      this.checkEmailAvailability(email);
    });

    this.employeeForm.get('contactNumber').valueChanges.pipe(
      debounceTime(500)
    ).subscribe((contactNumber) => {
      this.checkContactNumberAvailability(contactNumber);
    });
  }

  checkEmailAvailability(email: string) {
    this.employeeService.getEmployeeByEmail(email).subscribe(
      (emailResult) => {
        this.emailFlag = emailResult == null;
      },
      (error) => console.error(error)
    );
  }

  checkContactNumberAvailability(contactNumber: string) {
    this.employeeService.getEmployeeByContactNumber(contactNumber).subscribe(
      (contactResult) => {
        this.contactFlag = contactResult == null;
      },
      (error) => console.error(error)
    );
  }
 
  // onSubmit() {
  //   if (this.employeeForm.valid) {
  //     this.employeeService.getEmployeeByEmail(this.employeeForm.get('email').value).subscribe(
  //       (emailResult) => {
  //         if (emailResult == null) {
  //           this.emailFlag = true;
  //           this.employeeService.getEmployeeByContactNumber(this.employeeForm.get('contactNumber').value).subscribe(
  //             (contactResult) => {
  //               if (contactResult == null) {
  //                 this.contactFlag = true;
  //                 if (this.emailFlag && this.contactFlag) {
  //                   const employee = {
  //                     employeeName: this.employeeForm.get('employeeName').value,
  //                     designation: this.employeeForm.get('designation').value,
  //                     contactNumber: this.employeeForm.get('contactNumber').value,
  //                     email: this.employeeForm.get('email').value,
  //                     department: this.employeeForm.get('department').value,
  //                   };
  //                   this.employeeService.addEmployee(employee).subscribe(
  //                     (value) => {
  //                       console.log("New Employee Added", value);
  //                       alert("Employee Added");
  //                       this.employeeService.announceEmployeeAdded(); // Announce that a product has been added
  //                       this.employeeForm.reset();
  //                       this.emailFlag = false;
  //                       this.contactFlag = false;
  //                     },
  //                     (error) => {
  //                       console.error("Error:", error);
  //                       this.emailFlag = false;
  //                       this.contactFlag = false;
  //                     }
  //                   );
  //                 }
  //               } else {
  //                 alert("Contact Number already exists");
  //               }
  //             },
  //             (error) => console.log(error)
  //           );
  //         } else {
  //           alert("Email already exists");
  //         }
  //       },
  //       (error) => console.log(error)
  //     );
  //   }
  // }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.emailFlag && this.contactFlag) {
        const employee = {
          employeeName: this.employeeForm.get('employeeName').value,
          designation: this.employeeForm.get('designation').value,
          contactNumber: this.employeeForm.get('contactNumber').value,
          email: this.employeeForm.get('email').value,
          department: this.employeeForm.get('department').value,
        };
        this.employeeService.addEmployee(employee).subscribe(
          (value) => {
            console.log("New Employee Added", value);
            alert("Employee Added");
            this.employeeService.announceEmployeeAdded();
            this.employeeForm.reset();
            this.emailFlag = true;
            this.contactFlag = true;
          },
          (error) => {
            console.error("Error:", error);
            this.emailFlag = false;
            this.contactFlag = false;
          }
        );
      } else {
        if (!this.emailFlag) {
          console.log("Email exist");
        }
        if (!this.contactFlag) {
          console.log("Contact exist");
        }
      }
    }
  }

}
