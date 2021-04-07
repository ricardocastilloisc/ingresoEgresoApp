import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgreso from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription
  ingreSubs: Subscription

  constructor(private store: Store<AppState>,
    private ingresoEgresoService:IngresoEgresoService) { }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingreSubs.unsubscribe();
  }

  ngOnInit() {
    this.userSubs = this.store.select('user').pipe(
      filter(auth => auth.user != null)
    ).subscribe( ({user}) => {
      this.ingreSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid).subscribe(ingresosEgresos =>
        {
          this.store.dispatch(ingresoEgreso.setItems({items:ingresosEgresos}))
        })
    })
  };
}
