import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from '../../shared/modal/alert-modal.service';
import { CursosService } from '../../shared/services/api/cursos.service';
import { Curso } from '../../models/curso.model';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-cad',
  templateUrl: './cursos-cad.component.html',
  styleUrls: ['./cursos-cad.component.scss']
})
export class CursosCadComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  curso: Curso;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     const curso$ = this.cursosService.obterPorId(id);
    //     curso$.subscribe(dados => {
    //       this.updateForm(dados);
    //     })
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.cursosService.obterPorId(id)),
    //     // switchMap(cursos => obterAulas)
    //   )
    //   .subscribe(curso => this.updateForm(curso));

    //concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> espera a resposta paracasos de login

    /**
     * Recupera os dados usando o Resolve na rota
     */
    this.curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [this.curso.id],
      nome: [
        this.curso.nome,
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ]
    });
  }

  // updateForm(curso: Curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const objCurso = Object.assign({}, this.curso, this.form.value);

    /*if (this.form.value.id) {
      // Update
      this.cursosService.atualizar(objCurso).subscribe(
        success => {
          this.alertService.showSuccess('Curso atualizado com sucesso!');
          this.location.back();
        },
        error => {
          this.alertService.showError('Erro ao atualizar o curso');
        }
      );
    } else {
      this.cursosService.incluir(objCurso).subscribe(
        success => {
          this.alertService.showSuccess('Novo curso salvo com sucesso!');
          this.location.back();
        },
        error => {
          this.alertService.showError('Erro ao cadastrar o curso');
        }
      );
    }*/

    let msgSuccess = 'Novo curso salvo com sucesso!';
    let msgError = 'Erro ao cadastrar o curso';
    if (this.form.value.id) {
      msgSuccess = 'Curso atualizado com sucesso!';
      msgError = 'Erro ao atualizar o curso';
    }

    this.cursosService.salvar(objCurso).subscribe(
      success => {
        this.alertService.showSuccess(msgSuccess);
        this.location.back();
      },
      error => {
        this.alertService.showError(msgError);
      }
    );
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
