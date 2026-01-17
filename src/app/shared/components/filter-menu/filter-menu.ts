import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-menu.html',
  styleUrl: './filter-menu.css',
})
export class FilterMenu {
  @Input() selectedOption: string = '';
  @Output() sortSelected = new EventEmitter<string>();


  options = ['All', 'Rap', 'Rock', 'pop'];

  selectOption(option: string) {
    this.selectedOption = option;
    this.sortSelected.emit(option);
  }
}
