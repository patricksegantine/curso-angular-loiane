import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  tap,
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap
} from 'rxjs/operators';
import { SearchResult } from 'src/app/models/result.model';
import { Lib } from 'src/app/models/lib.model';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  result$: Observable<SearchResult<Lib>>;
  total: number = 0;

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let filtro = '';
    this.result$ = this.queryField.valueChanges.pipe(
      map(value => {
        filtro = value.trim();
        return filtro
      }),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value =>
        this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })
      ),
      map((res: any) => {
        const x = res.results.filter(_ => _.name.indexOf(filtro) !== -1);
        this.total = x.length;

        return x;
      })
    )
  }

  onSearch() {
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {
      // const params_ = {
      //   search: value,
      //   fields: fields
      // };

      // forma dinâmica equivalente ao javascript URLSearchParams
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.SEARCH_URL);

      this.result$ = this.http
        .get<SearchResult<Lib>>(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }
  }
}
