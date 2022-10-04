import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string = 'http://localhost:8000/api/v1/clientes';

  constructor(
    private http: HttpClient
  ) {}

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

  guardarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}`, cliente);
  }

  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.baseUrl}/${id}`);
  }

  obtenerDetallesDeCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}/detalles`);
  }

  buscarClientes(tipo: string, texto: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/buscar/${tipo}/${texto}`);
  }

}
