import { Component, Input, OnInit } from '@angular/core';
import { PlotlyComponent } from 'angular-plotly.js';
import { NgWcpmsService } from '../public-api';

@Component({
  selector: 'lib-ng-wcpms',
  templateUrl: './ng-wcpms.component.html',
  styleUrls: ['./ng-wcpms.component.scss']
})

export class NgWcpmsComponent implements OnInit {

  @Input() collection: string = '';
  @Input() band: string = '';
  @Input() start_date: any = '';
  @Input() end_date: any = '';
  @Input() freq: string = '';
  @Input() latitude: string = '';
  @Input() longitude: string = '';
  @Input() access_token: string = '';

  @Input() cloud_filter: boolean = false;
  @Input() interpolate: boolean = false;
  @Input() peak_metric: string = 'pos';
  @Input() base_metric: string = 'vos';
  @Input() method: string = 'seasonal_amplitude';
  @Input() factor: number = 0.2;
  @Input() thresh_sides: string = 'two_sided';
  @Input() abs_value: number = 0.1;

  public data_plotly: any;

  public chart_layout = {
    showlegend: true,
    autosize: false,
    height: 160,
    width: 1380,
    margin: {
      l: 1,
      r: 1,
      b: 20,
      t: 1,
      pad: 1
    },
    legend: {x: 1, y: 0.5},
    hovermode:'closest'
  }
  public json_result: any;

  /**
   * Constructor to get infos of store application and set group of validators
   * @param route Initialize router control
   */
  constructor(
    private WcpmsService: NgWcpmsService
  ){};

  ngOnInit(): void {
    this.generatePhenometrics();
  }

  async generatePhenometrics(){
    let query = `?latitude=${this.latitude}`;
    query += `&longitude=${this.longitude}`;
    if(this.start_date)
      query += `&start_date=${this.start_date}`;
    if(this.end_date)
      query += `&end_date=${this.end_date}`;
    query += `&collection=${this.collection}`;
    if(this.access_token)
      query += `&access_token=${this.access_token}`;
    if(this.freq)
        query += `&freq=${this.freq}`;
    if(this.band)
        query += `&band=${this.band}`;
    const responseCollections: any = await this.WcpmsService.getPhenometrics(query);
    this.json_result = responseCollections;
    this.createChartData(responseCollections)
  }

  unpack(rows: any, key: any) {
    return rows.map(function(row: any) { return row[key]; });
  }

  smooth(values: Number[], alpha: any) {
    var weighted = this.average(values) * alpha;
    var smoothed: any = [];
    for (let i = 0; i < values.length; i++) {
      var curr = values[i];
      var prev = smoothed[i - 1] || values[values.length - 1];
      var next = curr || values[0];
      var improved = Number(this.average([weighted, prev, curr, next]).toFixed(2));
      smoothed.push(improved);
    }
    return smoothed;
  }

  average(data: any) {
      var sum = data.reduce(function(sum: any, value: any) {
          return sum + value;
      }, 0);
      var avg = sum / data.length;
      return avg;
  }

  async createChartData(response: any){


    var timeline = response.result.timeseries.timeline
    var timeseries = response.result.timeseries.values
    var phenometrics = response.result.phenometrics

    var pos_t_minus = new Date(phenometrics.pos_t.split('T')[0]);
    var pos_t_plus = new Date(phenometrics.pos_t.split('T')[0]);
    pos_t_minus.setDate(pos_t_minus.getDate() - 5);
    pos_t_plus.setDate(pos_t_plus.getDate() + 5);

    this.data_plotly = [];

    var trace1 = {
      mode: "lines",
      name:  this.band,
      x: timeline,
      y: timeseries,
      line: {color: '#17BECF'}
    }

    var trace2 = {
      mode: "lines",
      name:  "Smooth " + this.band,
      x: timeline,
      y: this.smooth(timeseries, 0.85),
      line: {color: '#ff0000'}
    }

    var trace3 = {
      mode: "markers",
      name:  'SOS',
      x: [phenometrics.sos_t.split('T')[0]],
      y: [phenometrics.sos_v],
      marker: {color: '#008c00', size: 12, line: {color: '#000000', width: 2 }},
    }

    var trace4 = {
      mode: "markers",
      name:  'POS',
      x: [phenometrics.pos_t.split('T')[0]],
      y: [phenometrics.pos_v],
      marker: {color: '#0009e3', size: 12, line: {color: '#000000', width: 2 }}
    }

    var trace5 = {
      mode: "markers",
      name:  'EOS',
      x: [phenometrics.eos_t.split('T')[0]],
      y: [phenometrics.eos_v],
      marker: {color: '#8a6100', size: 12, line: {color: '#000000', width: 2 }}
    }

    var trace6 = {
      mode: "markers",
      name:  'VOS',
      x: [phenometrics.vos_t.split('T')[0]],
      y: [phenometrics.vos_v],
      marker: {color: '#e35400', size: 12, line: {color: '#000000', width: 2 }}
    }

    var trace7 = {
      mode: "lines",
      name:  "LOS",
      x: [phenometrics.sos_t.split('T')[0], phenometrics.eos_t.split('T')[0]],
      y: [phenometrics.sos_v, phenometrics.eos_v],
      showlegend: false,
      line: {color: '#000000', dash: 'dashdot'}
    }

    var trace8 = {
      mode: "lines",
      name:  "AOS",
      x: [phenometrics.pos_t.split('T')[0], phenometrics.pos_t.split('T')[0]],
      y: [phenometrics.pos_v, 0],
      showlegend: false,
      line: {color: '#000000', dash: 'dashdot'}
    }

    var trace9 = {
      mode: "lines",
      name:  "LIOS",
      x: [phenometrics.sos_t.split('T')[0], phenometrics.sos_t.split('T')[0], phenometrics.pos_t.split('T')[0], phenometrics.eos_t.split('T')[0], phenometrics.eos_t.split('T')[0]],
      y: [0, phenometrics.sos_v, phenometrics.pos_v, phenometrics.eos_v, 0],
      fill: 'toself',
      showlegend: false,
      fillcolor: 'rgba(153, 247, 254, 0.4)',
      line: {color: 'rgba(153, 247, 254, 0.4)'}
    }

    var trace10 = {
      mode: "lines",
      name:  "ROI",
      x: [phenometrics.sos_t.split('T')[0], pos_t_minus],
      y: [phenometrics.sos_v+1500, phenometrics.pos_v+1500],
      showlegend: false,
      line: {color: '#000000', dash: 'dashdot'}
    }

    var trace11 = {
      mode: "lines",
      name:  "ROD",
      x: [pos_t_plus, phenometrics.eos_t.split('T')[0]],
      y: [phenometrics.pos_v+1500, phenometrics.eos_v+1500],
      showlegend: false,
      line: {color: '#000000', dash: 'dashdot'}
    }

    this.data_plotly = [trace9, trace1, trace2, trace7, trace8, trace3, trace4, trace5, trace6];
  }

}
