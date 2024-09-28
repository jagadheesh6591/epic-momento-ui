import { ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { DateTime, Info, Interval } from 'luxon';
import { EmployeeService } from '../employee/service/employee.service';
import { SnackbarService } from '../home/service/snackbar.service';
import { SpinnerService } from '../home/spinner/service/spinner.service';
import { TimesheetService } from './service/timesheet.service';
import { Timesheet, TimesheetGroupedByEmployee } from './view/timesheet';



@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetComponent {

  // timeSheetMap : Signal<Map<string,Timesheet[]>>
  // timesheetsData: Signal<TimesheetGroupedByEmployee[]>;

  timesheetsByEmp : Signal<TimesheetGroupedByEmployee>;
  timeSheets : Signal<Timesheet[]>;
  // timeSheetData = computed(() => {
  //   this.timeSheets().reduce((timesheet, data) => {
      
  //     timesheet[data.employee?.firstName] = data;
  //     return timesheet;
  //   }))

  
  constructor(private employeeService: EmployeeService, private snackBarService : SnackbarService, 
    private spinnerService : SpinnerService, private timeSheetService : TimesheetService
  ) { 

     // effect(() => {
    //   this.getTimeSheets();
    // });
    this.timeSheets = this.timeSheetService.timesheets;
    this.timesheetsByEmp = this.timeSheetService.timesheetByEmp;
    this.loadTimesheetsByEmp()
    // this.timesheetsData = timeSheetService.timeSheetByEmp;
    // this.timeSheetMap = timeSheetService.timeSheetMap;

    // console.log(this.timeSheetMap())
  }

  async loadTimesheetsByEmp() {
    this.spinnerService.show();
    await this.timeSheetService.getTimeSheetsMap(this.today().startOf('week'), this.today().endOf('week'));
    this.spinnerService.hide();
  }

   async loadTimesheets() {
    this.spinnerService.show();
    await this.timeSheetService.getTimeSheets(this.today().startOf('week'), this.today().endOf('week'));
    this.spinnerService.hide();
  }

  today : Signal<DateTime> = signal(DateTime.local());
  startOfPreviousWeek = this.today().startOf('week').minus({ weeks: 1 });  // Start of last week
  endOfPreviousWeek = this.today().startOf('week').minus({ days: 1 });     // End of last week (Saturday)

  firstDayOfActiveWeek : WritableSignal<DateTime> = signal(this.today().startOf('week'))
  weekdays : Signal<string[]> = signal(Info.weekdays('short'));
  currentWeekDays : Signal<DateTime[]> = computed(()=> {
    return Interval.fromDateTimes(
      this.firstDayOfActiveWeek().startOf('week'),this.firstDayOfActiveWeek().endOf('week')
    ).splitBy({day:1})
    .map(d => {
      if (d.start) {
        return d.start;
      }
      throw new Error('Invalid date range');
    })
  });

  getTimesheetsForEmployee(employeeName: string): Timesheet[] | undefined {
    console.log("retrive timesheets for emp", employeeName)
    // console.log(this.timesheetsData()[employeeName])
   // console.log(this.timeSheetMap())
    

  return undefined;
  }

  loadPreviousWeek() {
    this.firstDayOfActiveWeek.set(this.firstDayOfActiveWeek().minus({weeks: 1}));
  }

  loadNextWeek() {
    this.firstDayOfActiveWeek.set(this.firstDayOfActiveWeek().plus({weeks: 1}));
  }

  todayDate() {
    this.firstDayOfActiveWeek.set(this.today().startOf('week'));
  }

}
