import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExchangeConverterComponent } from './components/exchange-converter/exchange-converter.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: ExchangeConverterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
