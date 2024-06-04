import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private _router:Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value as User; // Convert form value to User object
      this.userService.saveUserToServer(newUser).subscribe(() => {
        console.log('המשתמש נרשם בהצלחה');
        this._router.navigate(['/allRecipes']);
        // Optionally, you can navigate to another page upon successful registration
        // this.router.navigate(['/success']);
      });
    }
  }
}