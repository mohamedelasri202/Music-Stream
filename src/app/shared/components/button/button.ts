import { Component, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

   @Input() label: string =''
   @Input() type:'button'|'submit' = 'button';
   @Input() disabled: boolean = false ;

   @Input() variant:'primary'| 'danger'| 'dark' |'success' = 'primary'
      @Output() onClick = new EventEmitter<void>(); 
      handleClick() {
    console.log('Button Atom: I was clicked, broadcasting now...');
    this.onClick.emit(); 
  }

    getClasse(){
      const base = "px-6 py-2 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 ";
      const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
      danger: "bg-red-500 text-white hover:bg-red-600",
      dark: "bg-gray-900 text-white hover:bg-black",
      success: "bg-green-600 text-white hover:bg-green-700"
    };
    return base + variants[this.variant];
    }


}
