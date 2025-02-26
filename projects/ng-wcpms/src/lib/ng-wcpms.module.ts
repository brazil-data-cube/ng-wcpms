import { NgModule } from '@angular/core';
import { NgWcpmsComponent } from './ng-wcpms.component';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    NgWcpmsComponent
  ],
  imports: [
    PlotlyModule
  ],
  exports: [
    NgWcpmsComponent
  ]
})
export class NgWcpmsModule { }
