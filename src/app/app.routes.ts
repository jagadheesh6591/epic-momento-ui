import { ActivatedRouteSnapshot, ResolveFn, Route } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

export const titleResolver: ResolveFn<string> =
    (route : ActivatedRouteSnapshot) => 
        route.routeConfig?.path?.replace('-','') ?? '';

export const appRoutes: Route[] = [
    {path:'employee',component:EmployeeComponent,title:titleResolver},
    {path:'timesheet',component:TimesheetComponent,title:titleResolver},
    {path:'', pathMatch:'full', component:EmployeeComponent},

];

