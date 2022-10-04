import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-agregar',
  templateUrl: './cliente-agregar.component.html',
  styleUrls: ['./cliente-agregar.component.css']
})
export class ClienteAgregarComponent implements OnInit {

  form!: FormGroup;

  submitted = false;

  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  guardarCliente(): void {
    this.submitted = true;
    if ( this.form.valid ) {
      
      this.cliente = {
        id: 0,
        nombre: this.form.value.nombre,
        telefono: this.form.value.telefono,
        email: this.form.value.email,
        dni: this.form.value.dni,
        direccion: this.form.value.direccion
      };

      this.clienteService.guardarCliente(this.cliente).subscribe(
        res => {
          this.submitted = false;
          this.form.reset();
          Swal.fire({
            title: 'EXITO!',
            text: 'Datos guardados',
            icon: 'success'
          });
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'UPS!',
            text: 'Datos no guardados',
            icon: 'error'
          });
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

}
