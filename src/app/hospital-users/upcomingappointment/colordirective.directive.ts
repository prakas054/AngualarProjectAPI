import { Directive, ElementRef,Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColordirective]'
})
export class ColordirectiveDirective implements OnInit {

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor ="green";
   }
  ngOnInit(): void {
    
  }

}
