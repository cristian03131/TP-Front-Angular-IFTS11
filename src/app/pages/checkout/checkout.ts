import { ChangeDetectionStrategy, Component, } from "@angular/core";
import { ShippingForm } from "../../components/checkout/shipping-form/shipping-form";
import { OrderSummary } from "../../components/checkout/order-summary/order-summary";
import { PaymentForm } from "../../components/checkout/payment-form/payment-form";

@Component({
    selector:'app-checkout',
    imports: [ShippingForm, OrderSummary,PaymentForm],
    templateUrl:'./checkout.html',
    changeDetection:ChangeDetectionStrategy.Eager,
    styleUrl:'./checkout.css'
})
export class Checkout{

}