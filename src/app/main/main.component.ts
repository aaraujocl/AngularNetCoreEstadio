import { ControlEntrada } from './ControlEntrada.model';
import { Hincha } from './Hincha.model';
import { ConsultarEntradasService } from './ConsultarEntradasService.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResponseApi } from '../ResponseApi.model';
import { Estadios } from './Estadios.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  @ViewChild('registrarentradaHincha') registrarentradaHincha: NgForm;
  @ViewChild('hinchacolaborador') hinchacolaborador: NgForm;

  @ViewChild('actualizarEstadioForm') actualizarEstadioForm: NgForm;

  @ViewChild('cerrarregistro') cerrarregistro: ElementRef;
  @ViewChild('cerrarestadio') cerrarestadio: ElementRef;


  ListEntradas: [] = [];
  ListEstadios: Estadios [];
  CosultaApi: ResponseApi;
  ListHinchas: Hincha [];

  hincha: Hincha = {
    idhincha: 0,
    nombre: ''
  };

  saleData = [];

  controlentrada: ControlEntrada = {
    IdControl: 0,
    Tipo: '',
    EntradaSalida: 0,
    IdHincha: 0,
    Asiento: '',
    IdEntrada: 1,
  };

  Estadio: Estadios = {
    idEstadio: 0,
    nombre: '',
    capacidadTotal: 0,
    porcentaje: 0,
    capacidadPermitida: 0,
    controldeEntradas: []
  };


  totalasientosocupados = 0;
  capacidaddisponible = 0;
  asientosocupados = 0;
  editarcapacidad = true;
  entraracontrolES = true;
  alguardarhincha = false;

  constructor(private entradasService: ConsultarEntradasService) {
   }

  ngOnInit(): void {
    this.listarEntradas();
    this.listarEstadio();
  }

  listarEntradas() {
    this.entradasService.listarEntradas()
      .subscribe(
        (COnsulta: ResponseApi) => {
          this.CosultaApi = COnsulta;
          this.ListEntradas = this.CosultaApi.result;
          console.log(JSON.stringify(this.ListEntradas));
        },
        error => {
          console.log('Error ' + error);
        }
      );
  }

  listarEstadio() {
    let index = 0;
    let acumocupados = 0;
    this.entradasService.listarEstadios()
      .subscribe(
        (COnsulta: ResponseApi) => {
          this.CosultaApi = COnsulta;
          this.ListEstadios = this.CosultaApi.result;
          if (this.ListEstadios.length > 0) {
            this.Estadio = this.ListEstadios[index];
            this.Estadio.controldeEntradas.forEach(element => {
              acumocupados = acumocupados + Number(element.entradaSalida);
            });
            this.totalasientosocupados = acumocupados;
            this.capacidaddisponible = this.Estadio.capacidadPermitida - acumocupados;
            this.saleData = [
              { name: 'Capacidad Estadio', value: this.Estadio.capacidadTotal },
              { name: 'Permitida', value: this.Estadio.capacidadPermitida },
              { name: 'Disponible', value: this.capacidaddisponible },
              { name: 'Ocupados', value: this.totalasientosocupados }];
          }
        },
        error => {
          console.log('Error ' + error);
        }
      );
  }



  administrarentrada(id: number){
    console.log('Va de entrada ' + this.Estadio.capacidadPermitida + ' ' + this.capacidaddisponible);
    this.controlentrada.IdEntrada = id;
    if (this.totalasientosocupados >= this.capacidaddisponible){
      alert('Ya no hay Asientos disponibles');
    }
  }

  administrarsalida(){
    console.log('Va de salida');
  }


  agregarHincha({ value, valid }: { value: Hincha, valid: boolean }){
    let index = 0;
    if (!valid) {
      alert('Faltan Datos Obligatorios');
    }
    else {
      this.entradasService.agregarHincha(value)
      .subscribe((response: ResponseApi) => {
        this.CosultaApi = response;
        const idhncha = Number(this.CosultaApi.result);
        if (this.CosultaApi.message === 'Success'){
          this.hincha.idhincha = idhncha;
          this.hincha.nombre = value.nombre;
          this.alguardarhincha = true;

        }
        else{
          console.log('No entro aqui');

        }

      },
        (err: HttpErrorResponse) => {
          console.log('Entro a error');

        });
      console.log(value.nombre);
    }
  }

  registrarEntrada({ value, valid }: { value: ControlEntrada, valid: boolean }){
    let index = 0;
    console.log(JSON.stringify(value));
    if (!valid) {
      alert('Faltan Datos Obligatorios');
    }
    else {
      this.entradasService.agregarEntrada(value.Asiento, this.controlentrada.IdEntrada, this.hincha.idhincha, this.Estadio.idEstadio)
      .subscribe((response: ResponseApi) => {
        this.CosultaApi = response;
        const idhncha = Number(this.CosultaApi.result);
        if (this.CosultaApi.message === 'Success'){
          this.registrarentradaHincha.resetForm();
          this.cerrarregistro.nativeElement.click();
          this.alguardarhincha = false;
          this.listarEstadio();
        }
        else{
          console.log('No entro aqui');
        }
      },
        (err: HttpErrorResponse) => {
          console.log('Entro a error');

        });
    }
  }

  public cancelarregistro(){
    this.registrarentradaHincha.resetForm();
    this.cerrarregistro.nativeElement.click();
  }

  modificarcapacidad({ value, valid }: { value: Estadios, valid: boolean }){
    console.log(JSON.stringify(value));
    if (!valid) {
      alert('Faltan Datos Obligatorios');
    }
    else{

      console.log(JSON.stringify(this.Estadio));
      this.entradasService.actualizarEstadio(this.Estadio)
      .subscribe((response: ResponseApi) => {
        this.CosultaApi = response;
        if (this.CosultaApi.message === 'Success'){
          this.actualizarEstadioForm.resetForm();
          this.cerrarestadio.nativeElement.click();
          this.listarEstadio();
        }
        else{
          console.log('No entro aqui');
        }
      },
        (err: HttpErrorResponse) => {
          console.log('Entro a error ' + JSON.stringify(err));

        });
    }
  }

  calcular(): void {
    const permitido = Number((this.Estadio.capacidadTotal * this.Estadio.porcentaje) / 100);
    this.Estadio.capacidadPermitida = Math.round(permitido);
    console.log(this.Estadio.capacidadPermitida);
  }

  cancelarestadio(){
    this.actualizarEstadioForm.resetForm();
    this.cerrarestadio.nativeElement.click();
  }


}
