import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../view/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/employees`;

  employees = signal<Employee[]>([]);

  constructor(private http: HttpClient) {
    // Effect to automatically fetch employees when the service is instantiated
    effect(() => {
      this.getAllEmployees();
    });
  }

  getAllEmployees(): void {
    this.http.get<Employee[]>(this.apiUrl).subscribe((data) => {
      this.employees.set(data);
    });
  }

  save(employee: Employee) : Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  delete(id: number) {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(deleteUrl);
  }

  update(employee : Employee) {
    return this.http.put<Employee>(this.apiUrl,employee);
  }

}
