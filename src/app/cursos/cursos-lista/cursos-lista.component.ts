import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertModalService } from '../../shared/modal/alert-modal.service';
import { CursosService } from '../../shared/services/api/cursos.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  cursoSelecionado: Curso;

  confirmModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal; //referência para um componente que tá no template

  constructor(
    private cursoService: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmModalService: BsModalService
  ) {}

  ngOnInit(): void {
    // this.cursoService.listar()
    //   .subscribe(data => (this.cursos = data));

    this.carregarCursos();
  }

  carregarCursos() {
    this.cursos$ = this.cursoService.listar().pipe(
      catchError(error => {
        console.error(error);
        //this.error$.next(true);
        this.alertService.showError('Erro ao carregar os dados...');
        return empty();
      })
    );

    // 2ª forma
    // this.cursoService.listar().subscribe(
    //   (dados) => {

    //   },
    //   (error) => {

    //   },
    //   () => console.log('Observable completo.')
    // );
  }

  onEditar(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onExcluir(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.confirmModalRef = this.confirmModalService.show(this.deleteModal, {
    //   class: 'modal-md'
    // });

    const result$ = this.alertService.showConfirm(
      'Excluir',
      `Confirma a exclusão do curso "${curso.nome}"`
    );
    result$
      .pipe(
        switchMap(result => result ? this.cursoService.remover(curso.id) : EMPTY)
      )
      .subscribe(
        success => this.carregarCursos(),
        error => this.alertService.showError('Erro ao excluir o curso')
      );
  }


  /**
   * Método utilizando template
   */
  onConfirm() {
    this.cursoService.remover(this.cursoSelecionado.id).subscribe(
      success => {
        this.carregarCursos();
        this.confirmModalRef.hide();
      },
      error => {
        this.alertService.showError('Erro ao excluir o curso');
        this.confirmModalRef.hide();
      }
    );
  }

  /**
   * Método utilizando template
   */
  onDecline() {
    this.confirmModalRef.hide();
  }
}
