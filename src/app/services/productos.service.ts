import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {productoInterface} from '../../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: productoInterface[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-html-11928.firebaseio.com/productos_idx.json')
      .subscribe( (resp: productoInterface[]) => {
        this.productos = resp;
        this.cargando = false;
        console.log(resp);
      });
  }
}
