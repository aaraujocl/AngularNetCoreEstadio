export class ControlEntrada{

  IdControl: number;
  Tipo: string;
  EntradaSalida: number;
  IdHincha: number;
  Asiento: string;
  IdEntrada: number;

  constructor(idcon: number, tipo: string, entrada: number, idhinca: number, asien: string, idenr: number){

    this.IdControl = idcon;
    this.Tipo = tipo;
    this.EntradaSalida = entrada;
    this.IdHincha = idhinca;
    this.Asiento = asien;
    this.IdEntrada = idenr;
  }
}
