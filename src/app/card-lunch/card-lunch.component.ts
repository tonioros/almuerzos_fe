import {Component, Input} from '@angular/core';
import {OrderModel} from "../../models/order.model";
import {OrderStatus} from "../../constants/order-status";

@Component({
  selector: 'app-card-lunch',
  templateUrl: './card-lunch.component.html',
  styleUrl: './card-lunch.component.scss'
})
export class CardLunchComponent {
  @Input() order?: OrderModel;

  stateTextStatus(status: string) {
    // @ts-ignore
    return OrderStatus[status];
  }

}
