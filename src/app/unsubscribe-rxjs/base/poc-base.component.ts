import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  templateUrl: './poc-base.component.html'
})
export class PocBaseComponent implements OnInit {
  @Input() estilo: string;
  @Input() titulo: string;
  @Input() valor: string;

  constructor() {}

  ngOnInit(): void {}
}
