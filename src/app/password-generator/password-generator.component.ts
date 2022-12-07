import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
})
export class PasswordGeneratorComponent {
  @ViewChild('myForm') myForm!: NgForm;
  text: String = '';
  disabledButton: boolean = true;
  validLength:boolean = false
  opciones = [
    { name: 'Letters', value: false },
    { name: 'Numbers', value: false },
    { name: 'Symbols', value: false },
  ];

  constructor() {
  }

  lengthValid(): boolean {
    this.validLength = this.myForm?.controls.length?.touched && this.myForm?.controls.length?.value <= 0
    return this.validLength;
  }
  generateClicked() {
    let password:string = ''
    var controls = this.myForm?.controls
    let possible = this.createPossible()

    for (let i = 0; i < controls.length.value; i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length))
      
    }

    this.text = password
    
  }

  opcionChecked(opcion: any, event: any) {
    this.opciones.map((op) => {
      if (op.name == opcion.name) {
        op.value = event.target.checked;
      }
    });
    this.disabledButton= this.validarCheckbox()
      
  }

  createPossible():string {
    var posible = '' 
    this.opciones.forEach(opcion => {
      if (opcion.value && opcion.name == "Letters") {
        posible += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      } else if (opcion.value && opcion.name == "Numbers"){
        posible += "1234567890"
      } else if(opcion.value && opcion.name == "Symbols"){
        posible += ",./;'[]\=-)(*&^%$#@!~`"
      }
    })
    return posible
  }

  validarCheckbox():boolean {

    var disable:boolean = true; 

    this.opciones.forEach((op) => {
      if (op.value) {
        disable = false
      } 
    });

    return disable
  }
}
