import { ChangeDetectionStrategy, Component, inject, signal, viewChild, } from "@angular/core";
import { ShippingForm } from "../../components/checkout/shipping-form/shipping-form";
import { OrderSummary } from "../../components/checkout/order-summary/order-summary";
import { PaymentForm } from "../../components/checkout/payment-form/payment-form";
import { LocalStorageService } from "../../services/localstorage.service";
import { CartItem } from "../../interfaces/cart-item.interface";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-checkout',
    imports: [ShippingForm, OrderSummary,PaymentForm],
    templateUrl:'./checkout.html',
    changeDetection:ChangeDetectionStrategy.Eager,
    styleUrl:'./checkout.css'
})
export class Checkout{

    private localStorageService = inject(LocalStorageService)
    private cartService=inject(CartService)
    private _router=inject(Router)
    private _shipping=viewChild.required(ShippingForm)
    private _payment=viewChild.required(PaymentForm)

    private cartData = signal<CartItem[]>([])
    readonly avisoDeAlerta= signal(false)

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

    confirmacionCompra():void{
        const datosEnvio=this._shipping().formulario
        const datosPago=this._payment().formulario

        if(datosEnvio.invalid || datosPago.invalid){
            datosEnvio.markAllAsTouched();
            datosPago.markAllAsTouched();
            this.avisoDeAlerta.set(true);
            return;
        }

        this.cartService.clearCart();
        this._router.navigate(['/products']);
    }
}