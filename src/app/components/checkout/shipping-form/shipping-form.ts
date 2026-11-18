import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector:'app-shipping-form',
    imports:[ReactiveFormsModule],
    templateUrl:'./shipping-form.html',
    changeDetection:ChangeDetectionStrategy.Eager,
    styleUrl:'./shipping-form.css'
})
export class ShippingForm{  
    private readonly _formBuilder=inject(FormBuilder)

    readonly formulario=this._formBuilder.nonNullable.group({
        nombre:['',[Validators.required,Validators.minLength(3),]],
        apellido:['',[Validators.required,Validators.minLength(3)]],
        email:['',[Validators.required,Validators.email]],
        domicilio:['',[Validators.required,Validators.minLength(3)]],
        altura:['',[Validators.required,Validators.minLength(1),Validators.maxLength(4)]],
        ciudad:['',[Validators.required,Validators.minLength(3)]],
        codigoPostal:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]]
    })

}