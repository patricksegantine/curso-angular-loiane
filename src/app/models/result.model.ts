export class SearchResult<T> {
  constructor(
    public results?: T,
    public total: number = 0,
  ) { }
}
