import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { CursosService } from '../../shared/services/api/cursos.service';
import { Curso } from '../../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoResolver implements Resolve<Curso> {
  constructor(private cursosService: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.cursosService.obterPorId(route.params['id']);
    }

    return of(new Curso(null, ''));
  }
}
