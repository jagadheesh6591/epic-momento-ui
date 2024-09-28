import { Employee } from "src/app/employee/view/employee";

export interface Timesheet {
    id: number;
    date?: Date;
    checkIn?: string;
    checkOut?: string;
    employee?: Employee;
}

export interface TimesheetGroupedByEmployee {
    [employeeName: string]: Timesheet[];  
}

export interface TimesheetMapType {
    timesheetMap : Map<string,Timesheet[]>;
 }


//  export type TimesheetGroupedByEmployee = Record<string, Timesheet[]>;
