export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    mobileNumber: number;
    dob?: Date;
    lastLogin?: Date;
}