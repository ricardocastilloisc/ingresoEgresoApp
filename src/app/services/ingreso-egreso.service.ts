import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore:AngularFirestore, private authService: AuthService) { }


  crearIngresoEgreso = (ingresoEgreso: IngresoEgreso) => {
    delete(ingresoEgreso.uid);
    return this.firestore.doc(`${this.authService.user.uid}/ingreso-egreso`)
    .collection('items')
    .add({...ingresoEgreso})

  }
}
