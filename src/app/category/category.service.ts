import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../category/model/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'https://localhost:7127/api/Category';

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching Category:', error);
          return throwError('Something went wrong while fetching category. Please try again later.');
        })
      );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching recipe with ID ${id}:`, error);
          return throwError('Something went wrong while fetching the recipe. Please try again later.');
        })
      );
  }

  addCategory(category: Category): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseUrl, category)
      .pipe(
        catchError(error => {
          console.error('Error adding recipe:', error);
          return throwError('Something went wrong while adding the recipe. Please try again later.');
        })
      );
  }

  updateCategory(id: number, category: Category): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}/${id}`, category)
      .pipe(
        catchError(error => {
          console.error(`Error updating recipe with ID ${id}:`, error);
          return throwError('Something went wrong while updating the recipe. Please try again later.');
        })
      );
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting recipe with ID ${id}:`, error);
          return throwError('Something went wrong while deleting the recipe. Please try again later.');
        })
      );
  }
}