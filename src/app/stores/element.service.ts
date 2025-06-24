import { Injectable, signal, computed } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.model';

@Injectable({ providedIn: 'root' })
export class ElementService {
  private readonly _elements = signal<PeriodicElement[]>([]);
  private readonly _filter = signal<string>('');

  private readonly ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  public readonly elements = computed(() => {
    const term = this._filter().toLowerCase();
    return this._elements().filter(e =>
      Object.values(e).some(val => val.toString().toLowerCase().includes(term))
    );
  });

  loadElements(): void {
    setTimeout(() => this._elements.set(this.ELEMENT_DATA), 1000);
  }

  updateElement(updated: PeriodicElement): void {
    const updatedList = this._elements().map(el =>
      el.position === updated.position ? updated : el
    );
    this._elements.set(updatedList);
  }

  setFilter(term: string): void {
    this._filter.set(term);
  }
}