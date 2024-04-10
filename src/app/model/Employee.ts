export class Employee {
    employeeId?: number;
    employeeName: string;
    designation: string;
    contactNumber: string;
    email: string;
    department: string;

    constructor(employeeId: number,employeeName: string,designation: string,contactNumber: string,email: string,department: string) {
        this.employeeId=employeeId;
        this.employeeName=employeeName;
        this.designation=designation;
        this.contactNumber=contactNumber;
        this.email=email;
        this.department=department;
    }
}

export let employees:Employee[] = [
    {
        employeeId: 1,
        employeeName: "Anush",
        designation: "SE",
        contactNumber: "6383244430",
        email: "anush@gmail.com",
        department: "Frontend"  
    },

    {
        employeeId: 2,
        employeeName: "Karthik",
        designation: "HE",
        contactNumber: "6383244431",
        email: "karthik@gmail.com",
        department: "Backend"  
    },

    {
        employeeId: 3,
        employeeName: "Pranav",
        designation: "SE",
        contactNumber: "6383244433",
        email: "pranav@gmail.com",
        department: "Frontend"  
    },

    {
        employeeId: 4,
        employeeName: "Kumar",
        designation: "HE",
        contactNumber: "6383244434",
        email: "kumar@gmail.com",
        department: "Frontend"  
    }
]