import { ChangeDetectionStrategy, Component, computed, input, output } from "@angular/core";
import { CartItem } from "../../../interfaces/cart-item.interface";
import { CurrencyPipe } from "@angular/common";

@Component({
    selector: 'app-order-summary',
    imports: [CurrencyPipe],
    templateUrl: './order-summary.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './order-summary.css'
})
export class OrderSummary {
    items() {
        throw new Error('Method not implemented.');
    }
    cartData = input<CartItem[]>([]);
    readonly deshabilitado = input(false)
    readonly confirmar = output<void>()
    readonly total = computed(() =>this.cartData().reduce((suma, item) => suma + item.product.price * item.quantity, 0))
}
