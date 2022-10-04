import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.css']
})
export class ClienteEditarComponent implements OnInit {

  form!: FormGroup;

  submitted = false;

  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.form = this.initForm();
    this.obtenerClientePorId(Number(id));
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

  obtenerClientePorId(id: number): void {
    this.clienteService.obtenerClientePorId(id).subscribe(
      res => {
        this.cliente = res;
        this.form.patchValue(this.cliente);
      },
      error => {
        console.log(error);
      }
    );
  }

  actualizarCliente(): void {
    this.submitted = true;
    if ( this.form.valid ) {
      
      this.cliente = {
        id: this.cliente.id,
        nombre: this.form.value.nombre,
        telefono: this.form.value.telefono,
        email: this.form.value.email,
        dni: this.form.value.dni,
        direccion: this.form.value.direccion
      };

      this.clienteService.actualizarCliente(this.cliente.id, this.cliente).subscribe(
        res => {
          Swal.fire({
            title: 'EXITO!',
            text: 'Datos actualizados',
            icon: 'success'
          });
          this.router.navigate(['/admin/clientes']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'UPS!',
            text: 'Datos no actualizados',
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
