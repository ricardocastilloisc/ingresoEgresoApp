import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;

  TotalEgresos: number = 0;
  TotalIngresos: number = 0;
  ingresosEgresosSub: Subscription;



  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];



  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {
    this.ingresosEgresosSub.unsubscribe();
  }

  ngOnInit() {
    this.ingresosEgresosSub = this.store
      .select('ingresosEgresos')
      .subscribe(({items}) => {
        this.generarEstadistica(items)
      });
  }


  generarEstadistica = (items:IngresoEgreso[]) =>
  {
    this.TotalEgresos= 0;
    this.TotalIngresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    items.forEach(e =>
      {
        if(e.tipo ==='ingreso')
        {
          this.TotalIngresos += e.monto;
          this.ingresos++;
        }else
        {
          this.TotalEgresos += e.monto;
          this.egresos++;
        }
      })
    this.doughnutChartData = [[this.TotalIngresos, this.TotalEgresos]];
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
