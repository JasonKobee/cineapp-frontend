import { UsuarioService } from 'src/app/_service/usuario.service';
import { DomSanitizer } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre: string;
  perfil: string;
  imagenData: any;
  imagenEstado: boolean = false;

  constructor(private sanitization: DomSanitizer, private usuarioService: UsuarioService) { }

  ngOnInit() {
    const helper = new JwtHelperService();

    let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk.access_token);

    this.nombre = decodedToken.user_name;
    this.perfil = decodedToken.authorities.join(" - ");
    this.usuarioService.listarPorUser(this.nombre).subscribe(data => {
      if (data.size > 0) {
        this.convertir(data);
      }
    });
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;      
      this.setear(base64);
    }
  }

  setear(x: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
    this.imagenEstado = true;
  }

}
