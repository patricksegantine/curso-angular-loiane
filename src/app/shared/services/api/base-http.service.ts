import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class BaseHttpService<T> {
  constructor(protected http: HttpClient, private apiUrl: string) {}

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  obterPorId(id): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  salvar(obj: T) {
    if (obj['id']) {
      return this.atualizar(obj);
    }

    return this.incluir(obj);
  }

  remover(id) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  //#region Helpers

  private incluir(obj: T) {
    return this.http.post(this.apiUrl, obj).pipe(take(1));
  }

  private atualizar(obj : T) {
    return this.http.put(`${this.apiUrl}/${obj['id']}`, obj).pipe(take(1));
  }

  //#endregion
}
