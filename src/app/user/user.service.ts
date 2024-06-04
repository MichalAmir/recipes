import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getCurrentUser() {
    throw new Error('Method not implemented.');
  }
  public baseUrl = 'https://localhost:7127/api/Users';
  
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<User[]> {
      return this._http.get<User[]>(this.baseUrl)
                 .pipe(
                    catchError(this.handleError)
                 );
  }

  getUserById(id: number): Observable<User> {
      return this._http.get<User>(`${this.baseUrl}/${id}`)
                 .pipe(
                    catchError(this.handleError)
                 );
  }

  saveUserToServer(user: User): Observable<User[]> {
      return this._http.post<User[]>(this.baseUrl, user)
                 .pipe(
                    catchError(this.handleError)
                 );
  }

  updateUserOnServer(id: number, updatedUser: User): Observable<User[]> {
      return this._http.delete<User[]>(`${this.baseUrl}+${id}`)
                .pipe(
                    catchError(this.handleError)
                 );
  }

  deleteUserFromServer(id: number): Observable<User[]> {
      return this._http.delete<User[]>(`${this.baseUrl}+${id}`)
                 .pipe(
                    catchError(this.handleError)
                 );
  }

  private handleError(error: HttpErrorResponse) {
    
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}