import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector:'app-payment-form',
    imports:[ReactiveFormsModule],
    templateUrl:'./payment-form.html',
    changeDetection:ChangeDetectionStrategy.Eager,
    styleUrl:'./payment-form.css'
})
export class PaymentForm{
    private readonly _formBuilder=inject(FormBuilder)

    readonly formulario=this._formBuilder.nonNullable.group({    
        nombreTarjeta:['',[Validators.required,Validators.minLength(10)]],
        numeroTarjeta:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
        vencimiento:['',[Validators.required,Validators.minLength(5)]],
        cvv:['',[Validators.required,Validators.minLength(3)]]
    })

}