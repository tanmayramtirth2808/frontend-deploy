import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  
  ngOnInit(): void {
    this.checkForAlert();
  }
 
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  //implemented using charts.js library

  public barChartLabels = ['Book1', 'Book2', 'Book3', 'Book4'];
  public barChartType: string = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [3, 3.5, 4, 4.2, 4.5], label: 'Review 1' },
    { data: [3.2, 3.8, 4.1, 4.5, 4.8], label: 'Review 2' }
  ]

  checkForAlert() {
    const limit = 4.5;

    for(const dataSet of this.barChartData)
    {
      for(const value of dataSet.data)
      {
        if(value >= limit)
        {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'Value is greater than or equal to 4.5',
              confirmButtonText: 'Ok'
            })          
        }
      }
    }
  }
}
