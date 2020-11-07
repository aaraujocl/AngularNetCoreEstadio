export class Estadios {
  idEstadio: number;
  nombre: string;
  capacidadTotal: number;
  porcentaje: number;
  capacidadPermitida: number;
  controldeEntradas: any [];

  constructor(idest: number, nombre: string, capac: number, porc: number, capper: number, listacontrol: any[]){
    this.idEstadio = idest;
    this.nombre = nombre;
    this.capacidadTotal = capac;
    this.porcentaje = porc;
    this.capacidadPermitida = capper;
    this.controldeEntradas = listacontrol;
  }
}
