import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-detalles',
  templateUrl: './cliente-detalles.component.html',
  styleUrls: ['./cliente-detalles.component.css']
})
export class ClienteDetallesComponent implements OnInit {

  form!: FormGroup;

  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.form = this.initForm();
    this.obtenerDetallesDeCliente(Number(id));
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', []],
      telefono: ['', []],
      email: ['', []],
      dni: ['', []],
      direccion: ['', []]
    });
  }

  obtenerDetallesDeCliente(id: number): void {
    this.clienteService.obtenerDetallesDeCliente(id).subscribe(
      res => {
        this.cliente = res;
        this.form.patchValue(this.cliente);        
      },
      error => {
        console.log(error);
      }
    );
  }

}
