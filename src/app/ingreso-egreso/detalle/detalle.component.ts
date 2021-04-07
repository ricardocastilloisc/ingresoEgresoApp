import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  ingresoEgreso$:Observable<IngresoEgreso[]>;

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.ingresoEgreso$ = this.store.select('ingresosEgresos').pipe(map(({items}) => items))
  }

  borrar = (uid:string) => {
    console.log(uid);
  }

}
