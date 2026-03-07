import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-category-update',
  imports: [FormsModule],
  templateUrl: './category-update.html',
  styles: ``,
})
export class CategoryUpdate implements OnInit {
  @Input() category: CategoryModel = new CategoryModel();
  @Input() isAdd: boolean = true;
  @Output() categoryUpdated = new EventEmitter<CategoryModel>();

  ngOnInit(): void {
    // Optionnel : log ou initialisation
  }

  saveCategory() {
    this.categoryUpdated.emit(this.category);
  }
}
