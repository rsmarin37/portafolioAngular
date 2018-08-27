import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {infoPagina} from '../../interface/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: infoPagina = {};
  cargada = false;
  equipo: any[];
  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarEquipo(){
    this.http.get('https://angular-html-11928.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {
        this.equipo = resp;
       // console.log(resp);
      });
  }
  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: infoPagina) => {
        this.cargada = true;
        this.info = resp;
       // console.log(resp);
      });
  }

}
