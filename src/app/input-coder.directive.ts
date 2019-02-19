import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Error} from 'tslint/lib/error';

@Directive({
  selector: '[appInputCoder]'
})
export class InputCoderDirective implements OnInit {

  @Input() initialWidth: number;
  @Input() maxWidth: number;

  @Input() initialHeight: number;
  @Input() maxHeight: number;

  @Input() fontSize: 'none' | 'fit' | number = 'none';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    if (!this.initialWidth) {
      throw new Error('property "initialWidth" is required!');
    }

    if (!this.maxWidth) {
      throw new Error('property "initialWidth" is required!');
    }

    if (!this.initialHeight) {
      throw new Error('property "initialWidth" is required!');
    }

    if (!this.maxHeight) {
      throw new Error('property "initialWidth" is required!');
    }

    this.renderer.setProperty(this.el.nativeElement, 'contentEditable', true);

    this.renderer.setStyle(this.el.nativeElement, 'min-width', this.initialWidth + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'width', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'max-width', this.maxWidth + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'min-height', this.initialHeight + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'height', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'max-height', this.maxHeight + 'px');

    this.renderer.setStyle(this.el.nativeElement, '-webkit-box-sizing', 'border-box');
    this.renderer.setStyle(this.el.nativeElement, '-moz-box-sizing', 'border-box');
    this.renderer.setStyle(this.el.nativeElement, 'box-sizing', 'border-box');

    this.renderer.setStyle(this.el.nativeElement, '-ms-word-wrap', 'break-word');
    this.renderer.setStyle(this.el.nativeElement, 'word-wrap', 'break-word');
    this.renderer.setStyle(this.el.nativeElement, 'overflow-wrap', 'break-word');

    this.renderer.setStyle(this.el.nativeElement, 'overflow-y', 'auto');

    this.renderer.setStyle(this.el.nativeElement, 'white-space', 'normal');

    const rawTopPadding = getComputedStyle(this.el.nativeElement).paddingTop;
    const rawBottomPadding = getComputedStyle(this.el.nativeElement).paddingBottom;

    const topPadding = Number(rawTopPadding.substr(0, rawTopPadding.length - 2));
    const bottomPadding = Number(rawBottomPadding.substr(0, rawBottomPadding.length - 2));

    if (topPadding >= 0 && bottomPadding >= 0) {

      const lineHeight = this.initialHeight - topPadding - bottomPadding;

      this.renderer.setStyle(this.el.nativeElement, 'line-height', lineHeight + 'px');

      if (this.fontSize === 'fit') {
        this.renderer.setStyle(this.el.nativeElement, 'font-size', (lineHeight * 0.75) + 'px');
      } else if (this.fontSize !== 'none') {
        this.renderer.setStyle(this.el.nativeElement, 'font-size', this.fontSize + 'px');
      }

      this.el.nativeElement.addEventListener('input', this.onInput.bind(this));

    } else {
      throw new Error('could not compute the padding of the element. Please use px as padding value');
    }

  }

  onInput(event: KeyboardEvent): void {
    console.log(event);
  }

}
