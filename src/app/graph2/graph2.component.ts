import { Component } from '@angular/core';

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component {
  chartOptions: any;

  //implemented using Apache ECharts library

  constructor() {
    this.chartOptions = {
      title: {
        text: 'Books vs Reviews'
      },
      tooltip: {},
      xAxis: {
        name: 'Books',
        data: ['Book1', 'Book2', 'Book3', 'Book4']
      },
      yAxis: {
        name: 'Ratings'
      },
      series: [
        {
          name: 'Ratings',
          type: 'bar',
          data: [3, 3.5, 4, 4.5]
        }
      ]
    };
  }
}
