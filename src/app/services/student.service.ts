import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public startpoint = 'http://localhost:8000/api/student';

  constructor(
    private httpClient: HttpClient,
    public router: Router,
  ) { }

  getAllStudent(): Observable<any> {
    return this.httpClient.get(`${this.startpoint}/list`)
      .pipe(
        map((res: Response) => {
          console.log(res);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  addStudent(classform: FormGroup, birthTime: string): Observable<any> {
    const formData = new FormData();
    formData.append('first_name', classform.value.first_name);
    formData.append('last_name', classform.value.last_name);
    formData.append('class', classform.value.class);
    formData.append('date_of_birth', birthTime);
    return this.httpClient.post(`${this.startpoint}/add`, formData).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }


  updateStudent(data): Observable<any> {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('class', data.class);
    formData.append('date_of_birth', data.date_of_birth);
    return this.httpClient.post(`${this.startpoint}/add`, formData).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }


  getStudentDetail(id): Observable<any> {
    return this.httpClient.get(`${this.startpoint}/view/${id}`)
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
