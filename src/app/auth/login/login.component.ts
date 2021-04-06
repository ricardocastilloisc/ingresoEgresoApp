import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login = () => {
    if (this.loginForm.invalid) {
      return;
    }

    const { correo, password } = this.loginForm.value;

    this.authService
      .loginUsuario(correo, password)
      .then(credenciales =>
      {
        this.router.navigate(['/']);
      }
      ).catch((error) => {
        console.log(error);
      });
  };
}
