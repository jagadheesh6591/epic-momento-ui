import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Timesheet, TimesheetGroupedByEmployee, TimesheetMapType } from '../view/timesheet';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DateTime } from 'luxon';
import { Time } from '@angular/common';
import { SpinnerService } from 'src/app/home/spinner/service/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private apiUrl = `${environment.apiUrl}/timesheets`;
  timesheets = signal<Timesheet[]>([]);
  timesheetByEmp = signal<TimesheetGroupedByEmployee>({});
  spinnerService = inject(SpinnerService);

  constructor(private http: HttpClient) {
    // effect(() => {
    //   this.getTimeSheets();
    // });
  }

  getTimeSheets(fromDate : DateTime, toDate : DateTime) {
    const formattedFromDate = fromDate.toFormat('yyyy-MM-dd');  // Format as 'YYYY-MM-DD'
    const formattedToDate = toDate.toFormat('yyyy-MM-dd');  
    const params = new HttpParams()
      .set('fromDate', formattedFromDate)
      .set('toDate', formattedToDate);  

     this.http.get<Timesheet[]>(this.apiUrl+`/between`, {params}).subscribe((data) => {
        console.log('Timesheet data', data)
        this.timesheets.set(data);
      });
  }

  
  getTimeSheetsMap(fromDate : DateTime, toDate : DateTime) {
    const formattedFromDate = fromDate.toFormat('yyyy-MM-dd'); 
    const formattedToDate = toDate.toFormat('yyyy-MM-dd');  
    const params = new HttpParams()
      .set('fromDate', formattedFromDate)
      .set('toDate', formattedToDate);  
     this.http.get<TimesheetGroupedByEmployee>('http://localhost:8080/timesheets/groupByEmp', {params}).subscribe((data) => {
        console.log('Timesheet data', data)
        this.timesheetByEmp.set(data);
      });
  }
}
