import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { LengthAwarePaginatorComponent } from './length-aware-paginator/length-aware-paginator.component';
import { SortByFieldComponent } from './sort-by-field/sort-by-field.component';
import { PerPageComponent } from './per-page/per-page.component';
import { MultiPurposeSearchComponent } from './multi-purpose-search/multi-purpose-search.component';
import { LoaderComponent } from './loader/loader.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PipesModule],
  exports: [
    PaginationComponent,
    SearchInputComponent,
    SearchFormComponent,
    LengthAwarePaginatorComponent,
    SortByFieldComponent,
    PerPageComponent,
    MultiPurposeSearchComponent,
    LoaderComponent,
    ProductItemComponent
  ],
  declarations: [
    PaginationComponent,
    SearchInputComponent,
    SearchFormComponent,
    LengthAwarePaginatorComponent,
    SortByFieldComponent,
    PerPageComponent,
    MultiPurposeSearchComponent,
    LoaderComponent,
    ProductItemComponent
  ]
})
export class DirectivesModule {}
