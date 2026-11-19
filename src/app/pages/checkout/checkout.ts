import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from "@angular/core";
import { ShippingForm } from "../../components/checkout/shipping-form/shipping-form";
import { OrderSummary } from "../../components/checkout/order-summary/order-summary";
import { PaymentForm } from "../../components/checkout/payment-form/payment-form";
import { CartService } from "../../services/cart.service";
import { CompraService } from "../../services/compra.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-checkout',
    imports: [ShippingForm, OrderSummary,PaymentForm],
    templateUrl:'./checkout.html',
    changeDetection:ChangeDetectionStrategy.Eager,
    styleUrl:'./checkout.css'
})
export class Checkout{

    private cartService=inject(CartService)
    private compraService=inject(CompraService)
    private _router=inject(Router)
    private _shipping=viewChild.required(ShippingForm)
    private _payment=viewChild.required(PaymentForm)

    readonly cartData = this.cartService.cartItems
    readonly avisoDeAlerta= signal(false)

    confirmacionCompra():void{
        const datosEnvio=this._shipping().formulario
        const datosPago=this._payment().formulario

        if(datosEnvio.invalid || datosPago.invalid){
            datosEnvio.markAllAsTouched();
            datosPago.markAllAsTouched();
            this.avisoDeAlerta.set(true);
            return;
        }

        const items=this.cartData()
        if(items.length===0){
            return;
        }

        // Primero se registra la compra (con los ítems actuales) y recién después se vacía el carrito
        this.compraService.registrarCompra(datosEnvio.getRawValue(), items, this.cartService.totalPrice());
        this.cartService.clearCart();
        this._router.navigate(['/checkout/confirmation']);
    }
}