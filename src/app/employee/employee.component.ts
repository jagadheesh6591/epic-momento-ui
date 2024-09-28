import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './service/employee.service';
import { Employee } from './view/employee';
import { EmpDialogComponent } from './dialog/emp-dialog.component';
import { MatTableModule } from '@angular/material/table' ;
import { MatSortModule } from '@angular/material/sort' ;
import { MatMenuModule } from '@angular/material/menu' ;
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {
  MatDialog,
 MatDialogModule, 
 MatDialogRef
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { filter } from 'rxjs';
import { SnackbarService } from '../home/service/snackbar.service';
import { SpinnerService } from '../home/spinner/service/spinner.service';



@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,EmpDialogComponent,MatDatepickerModule, MatInputModule,MatFormFieldModule,FormsModule,
     MatTableModule, MatSortModule, MatMenuModule, MatToolbarModule, MatIconModule,MatDialogModule, MatNativeDateModule],
     providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      }
       ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  
  title!:string;
  readonly matDialog = inject(MatDialog);
  employees:Signal<Employee[]>;
  displayColumns = ['FirstName', 'LastName','DOB', 'Email','MobileNumber','Address', 'Action']

  get employeeDataSource() {
    return this.employees();
  }

  constructor(private employeeService: EmployeeService, private snackBarService : SnackbarService, 
    private spinnerService : SpinnerService
  ) { 
    this.employees = employeeService.employees;
  }

  addEmp() {
    const empDialogRef = this.matDialog.open(EmpDialogComponent, {width : '580px', height:'auto' , disableClose: true, autoFocus: true});
    empDialogRef.afterClosed().pipe(filter(val=>!!val)).subscribe(val => {
      console.log(val)
      this.spinnerService.show()
      this.employeeService.save(val)
      .subscribe( {
        next: (response) => {
          console.log('Employee created successfully', response);
          this.employeeService.getAllEmployees();
          this.spinnerService.hide()
          this.snackBarService.openSnackBar('Employee created successfully');
        },
        error: (error) => {
          console.error('Error creating employee', error);
          this.spinnerService.hide()
        }
      });
    }
  );

  }

  delete(empId:number) {
    this.spinnerService.show();
    this.employeeService.delete(empId).subscribe({
      next: (response) => {
        console.log('Employee deleted successfully', response);
        this.employeeService.getAllEmployees();
        this.spinnerService.hide()
        this.snackBarService.openSnackBar('Employee deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting employee', error);
        this.spinnerService.hide()
        // Handle error
      }
    })
  }

  update(employee : Employee) {

    console.log(employee)
    const empDialogRef = this.matDialog.open(EmpDialogComponent, {width : '580px', height:'auto' , disableClose: true, autoFocus: true, data : employee});
    empDialogRef.afterClosed().pipe(filter(val=>!!val)).subscribe(val => {
      console.log(val)
      this.spinnerService.show()
      this.employeeService.update(val).subscribe( {
        next: (response) => {
          console.log('Employee updated successfully', response);
          this.employeeService.getAllEmployees();
          this.spinnerService.hide()
          this.snackBarService.openSnackBar('Employee updated successfully');
        },
        error: (error) => {
          console.error('Error creating employee', error);
          this.spinnerService.hide()
          // Handle error
        }
      });
    }
  );


  }


}
