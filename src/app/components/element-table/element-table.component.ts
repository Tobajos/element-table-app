import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { PeriodicElement } from '../../models/periodic-element.model';
import { ElementService } from '../../stores/element.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  standalone:false,
  selector: 'app-element-table',
  templateUrl: './element-table.html',
  styleUrls: ['./element-table.scss'],
})
export class ElementTableComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol', 'actions'];
  data$!: typeof this.elementService.elements;
  private filterSubject = new Subject<string>();

  constructor(
    private readonly elementService: ElementService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.data$ = this.elementService.elements;
    this.elementService.loadElements();
    this.filterSubject.pipe(debounceTime(2000)).subscribe(value => {
      this.elementService.setFilter(value);
    });
  }

  applyFilter(value: string): void {
    this.filterSubject.next(value);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.applyFilter(target.value);
  }
  

  edit(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.updateElement(result);
      }
    });
  }
}
