import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {
 
  p: number = 1;

  clientes: Cliente[] = [];

  form!: FormGroup;

  submitted = false;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      tipo: ['', [Validators.required]],
      texto: ['', [Validators.required]]
    });
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe(
      res => {
        this.clientes = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarCliente(id: number): void {
    Swal.fire({
      title: 'ADVERTENCIA!',
      text: "¿Seguro de eliminar este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#343a40',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(id).subscribe(
          res => {
            this.ngOnInit();
            Swal.fire({
              title: 'EXITO!',
              text: 'Datos eliminados',
              icon: 'success'
            });
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'UPS!',
              text: 'Datos no eliminados',
              icon: 'error'
            });
          }
        );
      }
    })
  }

  buscarClientes(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.clienteService.buscarClientes(this.form.value.tipo, this.form.value.texto).subscribe(
        res => {
          this.clientes = res;
          this.submitted = false;
          this.form.reset();
          this.form.controls['tipo'].setValue('');
        },
        error => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        title: 'UPS!',
        text: 'Llene los campos requeridos',
        icon: 'error'
      });
    }
  }

  limpiar(): void {
    this.ngOnInit();
    this.submitted = false;
    this.form.reset();
    this.form.controls['tipo'].setValue('');
  }
  
}
