import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Class {
  id: number;
  code: string;
  name: string;
  maximum_students: string;
  status: number;
  description: string;
}


@Injectable({
  providedIn: 'root'
})

export class ClassService {

  public startpoint = 'http://localhost:8000/api/class';

  constructor(
    private httpClient: HttpClient,
    public router: Router,
  ) { }

  getAllClass(): Observable<any> {
    return this.httpClient.get(`${this.startpoint}/list`)
      .pipe(
        map((res: Response) => {
          console.log(res);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  addClass(classform: FormGroup): Observable<any> {
    const formData = new FormData();
    formData.append('code', classform.value.code);
    formData.append('name', classform.value.name);
    formData.append('maximum_students', classform.value.maximum_students);
    formData.append('status', classform.value.status);
    formData.append('description', classform.value.description);
    return this.httpClient.post(`${this.startpoint}/add`, formData).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  updateClass(data): Observable<any> {
    console.log(data);
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('code', data.code);
    formData.append('name', data.name);
    formData.append('maximum_students', data.maximum_students);
    formData.append('status', data.status);
    formData.append('description', data.description);
    return this.httpClient.post(`${this.startpoint}/add`, formData).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getClassDetail(id): Observable<any> {
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
