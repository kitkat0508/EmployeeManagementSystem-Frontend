import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeSource = new Subject<void>();
  employeeAdded = this.employeeSource.asObservable();

  private apiUrl = "http://localhost:5050";

  constructor(private http: HttpClient) {}

  announceEmployeeAdded() {
    this.employeeSource.next();
  }

  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+'/employee');
  }

  getEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl+'/employee/'+id);
  }

  getEmployeeByDesignation(designation:string):Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+'/employee/designation?designation='+designation);
  }

  getEmployeeByDepartment(department:string):Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+'/employee/department?department='+department);
  }

  getEmployeeByEmail(email:string):Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl+'/employee/email?email='+email);
  }

  getEmployeeByContactNumber(contactNumber:string):Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl+'/employee/contact?contact='+contactNumber);
  }

  addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl+'/employee',employee);
  }
}
