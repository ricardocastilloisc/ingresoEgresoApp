import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';
import { map } from 'rxjs/operators';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  ingresoEgreso$:Observable<IngresoEgreso[]>;

  constructor(private store:Store<AppState>, private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgreso$ = this.store.select('ingresosEgresos').pipe(map(({items}) => items))
  }

  borrar = (uid:string) => {
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(
      () =>
      {
        Swal.fire('Borrado','Item borrardo','success')
      }
    ).catch(
      err =>
      {
        Swal.fire('Error',err.message,'error')
      }
    )
  }


}
