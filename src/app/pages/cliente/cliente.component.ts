import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { Cliente } from './../../_model/cliente';
import { ClienteService } from './../../_service/cliente.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['idCliente', 'nombres', 'apellidos', 'fechaNac', 'dni', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(private clienteService: ClienteService, private dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit() {
    this.clienteService.clienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.clienteService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.clienteService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(cliente?: Cliente) {
    let com = cliente != null ? cliente : new Cliente();
    this.dialog.open(ClienteDialogoComponent, {
      width: '350px',
      data: com
    });
  }

  eliminar(genero: Cliente) {
    this.clienteService.eliminar(genero.idCliente).subscribe(data => {
      this.clienteService.listar().subscribe(medicos => {
        this.clienteService.clienteCambio.next(medicos);
        this.clienteService.mensajeCambio.next("Se elimino");
      });
    });
  }
}
