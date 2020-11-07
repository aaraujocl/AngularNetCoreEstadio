import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estadios } from './Estadios.model';
import { Hincha } from './Hincha.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultarEntradasService {

  constructor(private httpClient: HttpClient) { }

  listarEntradas() {

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = 'https://localhost:44373/api/Entrada';
   /* return this.httpClient.post(endpoint, JSON.stringify(body), { headers: httpHeaders });*/
    return this.httpClient.get(endpoint,  { headers: httpHeaders });
  }

  listarEstadios() {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = 'https://localhost:44373/api/Estadio';
   /* return this.httpClient.post(endpoint, JSON.stringify(body), { headers: httpHeaders });*/
    return this.httpClient.get(endpoint,  { headers: httpHeaders });
  }

  agregarHincha(hincha: Hincha) {
    const body = {
      IdHincha: 0,
      Nombre: hincha.nombre
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = 'https://localhost:44373/api/Hincha';
    return this.httpClient.post(endpoint, JSON.stringify(body), { headers: httpHeaders });
  }

  agregarEntrada(asiento: string, identrada: number, idhincha: number, idest: number) {
    const body = {
      IdControl: 0,
      Tipo: 'E',
      EntradaSalida: 1,
      IdHincha: idhincha,
      Asiento: asiento,
      IdEntrada: identrada,
      EstadioIdEstadio: idest

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = 'https://localhost:44373/api/ControlEntrada';
    return this.httpClient.post(endpoint, JSON.stringify(body), { headers: httpHeaders });
  }

  actualizarEstadio(estadio: Estadios) {

    const body = {
      IdEstadio: estadio.idEstadio,
      Nombre: estadio.nombre,
      CapacidadTotal: estadio.capacidadTotal,
      Porcentaje: estadio.porcentaje,
      CapacidadPermitida: estadio.capacidadPermitida,

    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = 'https://localhost:44373/api/Estadio';
    return this.httpClient.put(endpoint, JSON.stringify(body), { headers: httpHeaders });
  }

}
