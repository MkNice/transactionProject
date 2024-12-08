import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { categories, TYPES } from '../../shared/constants';
import { SelectComponent } from '../../shared/components/select/select.component';

@Component({
  selector: 'app-filters',
  imports: [SelectComponent],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  public categories: string[] = ['All', ...categories];
  public types: string[] = ['All', TYPES.INCOME, TYPES.EXPENSE];

  @Output() public filterChanged = new EventEmitter<Map<string, string>>();

  public filters: Map<string, string> = new Map([
    ['category', 'All'],
    ['type', 'All'],
  ]);

  public updateFilter(value: string, filterKey: string): void {
    this.filters.set(filterKey, value);
    this.filterChanged.emit(new Map(this.filters));
  }
}
