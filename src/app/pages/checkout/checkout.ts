import { ChangeDetectionStrategy, Component, inject, signal, } from "@angular/core";
import { ShippingForm } from "../../components/checkout/shipping-form/shipping-form";
import { OrderSummary } from "../../components/checkout/order-summary/order-summary";
import { PaymentForm } from "../../components/checkout/payment-form/payment-form";
import { LocalStorageService } from "../../services/localstorage.service";
import { CartItem } from "../../interfaces/cart-item.interface";

@Component({
    selector:'app-checkout',
    imports: [ShippingForm, OrderSummary,PaymentForm],
    templateUrl:'./checkout.html',
    changeDetection:ChangeDetectionStrategy.Eager,
    styleUrl:'./checkout.css'
})
export class Checkout{

    private localStorageService = inject(LocalStorageService);
    private cartData = signal<CartItem[]>([]);
    
    constructor() { 
        this.initCartData();
    }

    initCartData(){
        const localStorageData = this.localStorageService.getITem('cart');
        if (localStorageData){
            const data: CartItem[] = JSON.parse(localStorageData);
            this.cartData.set(data);
        }
    }
}