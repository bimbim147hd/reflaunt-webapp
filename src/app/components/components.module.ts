import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main.component';
import { BaseComponent } from './base.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DirectivesModule } from '../common/directives/directives.module';
import { PipesModule } from '@vicoders/angular';

@NgModule({
  declarations: [PageNotFoundComponent, MainComponent, HomepageComponent, BaseComponent],
  imports: [CommonModule, RouterModule, FormsModule, BrowserAnimationsModule, DirectivesModule, PipesModule],
  providers: [],
  exports: []
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule
    };
  }
}
