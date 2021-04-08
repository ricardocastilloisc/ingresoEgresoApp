import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {


  userObs$:Observable<Usuario>
  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit() {
    this.userObs$ = this.store.select('user').pipe(map(({user}) => user))
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    })

  }

}
