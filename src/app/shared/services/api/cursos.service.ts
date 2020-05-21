import { BaseHttpService } from './base-http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Curso } from '../../../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends BaseHttpService<Curso> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrlBase}/cursos`);
  }

  /**
   * código substituído pelo base-http.service
   */
  /*
  listar() {
    return this.http.get<Curso[]>(this.API).pipe(delay(2000), tap(console.log));
  }

  obterPorId(id) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  excluir(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

  salvar(curso: Curso) {
    if (curso.id) {
      return this.atualizar(curso);
    }

    return this.incluir(curso);
  }

  private incluir(curso: Curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private atualizar(curso: Curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }
  */
}
