import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FilterPipe} from './filter.pipe';

@NgModule({
  imports:        [BrowserModule, FormsModule],
  declarations:   [AppComponent, FilterPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
