import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
    standalone: true,
    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      ReactiveFormsModule,
      CommonModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  users: User[] = [];
  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      password: new FormControl(null, Validators.minLength(3)),
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  login(): void {
    const username = this.userForm.get('name')?.value;
    const password = this.userForm.get('password')?.value;

    const user = this.users.find(u => u.name === username);

    if (user) {
      if (user.password === password) {
        const serializedUser = JSON.stringify(user);
        sessionStorage.setItem('user', serializedUser);
        Swal.fire('Success', 'Logged in successfully', 'success');
        this.router.navigate(['/allRecipes']);
      } else {
        this.errorMessage = 'Wrong password';
      }
    } else {
      this.router.navigate(['/register']);
      this.errorMessage = 'User does not exist';
    }
  }

}

