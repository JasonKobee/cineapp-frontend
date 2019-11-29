import { DomSanitizer } from '@angular/platform-browser';
import { ClienteService } from './../../../_service/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from './../../../_model/cliente';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css']
})
export class ClienteDialogoComponent implements OnInit {

  cliente: Cliente;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  constructor(private dialogRef: MatDialogRef<ClienteDialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: Cliente, private clienteService: ClienteService, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.cliente = new Cliente();
    if (this.data.idCliente > 0) {
      this.cliente.idCliente = this.data.idCliente;
      this.cliente.nombres = this.data.nombres;
      this.cliente.apellidos = this.data.apellidos;
      this.cliente.fechaNac = this.data.fechaNac;
      this.cliente.dni = this.data.dni;

      this.clienteService.listarPorId(this.data.idCliente).subscribe(data => {
        if (data.size > 0) {
          this.convertir(data);
        }
      });
    }
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

  operar() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    console.log(this.cliente);
    if (this.cliente != null && this.cliente.idCliente > 0) {
      this.clienteService.modificar(this.cliente, this.currentFileUpload).subscribe(data => {
        this.clienteService.listar().subscribe(clientes => {
          this.clienteService.clienteCambio.next(clientes);
          this.clienteService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.clienteService.registrar(this.cliente, this.currentFileUpload).subscribe(data => {
        this.clienteService.listar().subscribe(clientes => {
          this.clienteService.clienteCambio.next(clientes);
          this.clienteService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }

  selectFile(e: any) {
    console.log(e);
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  cancelar() {
    this.dialogRef.close();
  }
}
