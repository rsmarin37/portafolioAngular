import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {productoInterface} from '../../interface/producto.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: productoInterface[] = [];
  productosFIltrado: productoInterface[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-11928.firebaseio.com/productos_idx.json')
        .subscribe( (resp: productoInterface[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }
  getProducto(id: string) {
    return this.http.get( `https://angular-html-11928.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {
    if ( this.productos.length === 0 ) {
      //cargar productos
      this.cargarProductos().then( () => {
        //ejecuta despz de tener los productos
        //aplica el filtro
        this.filtrarProductos( termino );
      });
    } else {
      //aplica el filtro
      this.filtrarProductos( termino );
    }
  }
  private filtrarProductos( termino: string) {
    termino = termino.toLowerCase();
    console.log(this.productos);
    this.productosFIltrado = [];
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFIltrado.push( prod );
      }
    });
  }
}
