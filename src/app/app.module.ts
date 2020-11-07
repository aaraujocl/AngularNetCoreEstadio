import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConsultarEntradasService } from './main/ConsultarEntradasService.service';
import { EditarestadioComponent } from './editarestadio/editarestadio.component';
import { RegistrarentradaComponent } from './registrarentrada/registrarentrada.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HeaderComponent,
    MainComponent,
    EditarestadioComponent,
    RegistrarentradaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [ConsultarEntradasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
