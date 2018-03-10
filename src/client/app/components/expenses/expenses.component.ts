import {Component, OnInit, ViewEncapsulation, HostBinding} from '@angular/core';
import * as c3 from 'c3';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExpensesComponent implements OnInit {
  @HostBinding('class') componentCssClass;
  chart;

  constructor(public overlayContainer: OverlayContainer) {}

  ngOnInit() {
    this.chart = c3.generate({
      data: {
        columns: [
          ['2018', 30, 200, 100, 400, 150, 250],
          ['2017', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
      }
    });
  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  onClickDonut () {
    this.chart = c3.generate({
      data: {
        columns: [
          ['2018', 30],
          ['2017', 120],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log('onclick', d, i); },
        onmouseover: function (d, i) { console.log('onmouseover', d, i); },
        onmouseout: function (d, i) { console.log('onmouseout', d, i); }
      },
      donut: {
        title: 'Iris Petal Width'
      }
    });
  }

  onClickBar () {
    this.chart = c3.generate({
      data: {
        columns: [
          ['2018', 30, 200, 100, 400, 150, 250],
          ['2017', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
      }
    });
  }

  onClickLine () {
    this.chart = c3.generate({
      data: {
        columns: [
          ['My expenses', 30, 200, 100, 400, 150, 250],
          ['Average', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }
}
