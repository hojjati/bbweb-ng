import { ConcurrencySafeEntity } from '@app/domain';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

export abstract class EntitySelectTypeahead<T extends ConcurrencySafeEntity> {
  selectedEntity: T;

  selected$: Subject<T> = new Subject<T>();

  getEntities: (text$: Observable<string>) => Observable<T[]>;

  constructor(private resultsMapper: (entities: T[]) => T[]) {
    this.getEntities = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => (term.trim() === '' ? of([]) : this.termMapper(term))),
        map(this.resultsMapper)
      );
  }

  onEntitySelected(item: NgbTypeaheadSelectItemEvent): void {
    this.selected$.next(item.item);
  }

  clearSelected(): void {
    this.selectedEntity = undefined;
  }

  abstract typeaheadFormatter(value: T): string;

  protected abstract termMapper(term: string): Observable<T[]>;
}
