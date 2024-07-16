import {Component, Input} from '@angular/core';
import {OrderModel} from "../../models/order.model";
import {OrderStatus} from "../../constants/order-status";

@Component({
  selector: 'app-card-lunch',
  templateUrl: './card-lunch.component.html',
  styleUrl: './card-lunch.component.scss'
})
export class CardLunchComponent {
  className = "";
  interval: any;
  opacity: number = 25;

  _order?: OrderModel;

  @Input() set order(v: OrderModel) {
    this._order = v;
  }

  stateTextStatus(status: string) {
    return OrderStatus[status];
  }


}
