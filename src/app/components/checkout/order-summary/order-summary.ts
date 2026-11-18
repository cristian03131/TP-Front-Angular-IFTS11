import { ChangeDetectionStrategy, Component, input, Signal, signal } from "@angular/core";
import { CartItem } from "../../../interfaces/cart-item.interface";

@Component({
    selector:'app-order-summary',
    imports:[],
    templateUrl:'./order-summary.html',
    changeDetection:ChangeDetectionStrategy.Eager,
    styleUrl:'./order-summary.css'
})
export class OrderSummary{
    cartData = input<CartItem[]>([]);
}