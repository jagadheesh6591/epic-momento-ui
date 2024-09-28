import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../view/employee';



@Component({
  selector: 'app-emp-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule,MatFormFieldModule,FormsModule,ReactiveFormsModule, MatDialogModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './emp-dialog.component.html',
  styleUrl: './emp-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpDialogComponent implements OnInit {

  title!:string;
  empForm !: FormGroup;
  readonly matDialogRef = inject(MatDialogRef<EmpDialogComponent>);


  constructor(private fb : FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    console.log(data)
  }


  ngOnInit(): void {
    
    this.title = "Add Employee"
    this.empForm = this.fb.group({
      firstName : ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]], 
      lastName : ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]], 
      dob : ['',Validators.required], 
      mobileNumber : ['',[Validators.required,Validators.pattern('^[0-9]+$')]], 
      email : ['',[Validators.required,Validators.email]], 
      address : ['',Validators.required],
      id : [''],
    })

    if(this.data) {
      this.title = 'Update Employee';
      this.empForm.get('firstName')?.setValue(this.data.firstName);
      this.empForm.get('lastName')?.setValue(this.data.lastName);
      this.empForm.get('dob')?.setValue(this.data.dob);
      this.empForm.get('mobileNumber')?.setValue(this.data.mobileNumber);
      this.empForm.get('email')?.setValue(this.data.email);
      this.empForm.get('address')?.setValue(this.data.address);
      this.empForm.get('id')?.setValue(this.data.id);

    }

  }

  onClose() {
    this.matDialogRef.close();
  }

  onSave() {
    if(this.empForm.valid) {
      this.matDialogRef.close(this.empForm.value);
    } else {
      console.log(this.empForm)
      this.empForm.markAllAsTouched();
    }
  }

}

export function openAddEditEmployee(dialog : MatDialog) {

  const config = new MatDialogConfig;

  config.disableClose = true;
  config.autoFocus = true;

  const dialogRef =  dialog.open(EmpDialogComponent,config);

  dialogRef.afterClosed();

}