import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private renderer: Renderer2) {

  }

  onInput(event: Event): void {
    const text = event['originalTarget']['textContent'].trim();

    const targetElement: HTMLElement = event['originalTarget'];

    if (text.length > 1) {

      if (text.charAt(0) === '"' || text.charAt(0) === '\'') {
        if (text.charAt(text.length - 1) === '"' || text.charAt(text.length - 1) === '\'') {

          const word = text.substr(1, text.length - 2);

          if (word.length > 0) {

            const chip = this.renderer.createElement('div');
            const chipText = this.renderer.createText(word);
            this.renderer.addClass(chip, 'chip');

            const colors = ['red-chip', 'blue-chip', 'green-chip', 'orange-chip'];

            this.renderer.addClass(chip, colors[Math.round(Math.random() * (colors.length - 1))]);
            this.renderer.appendChild(chip, chipText);

            const parent: HTMLElement = targetElement['parentElement'];

            this.renderer.appendChild(parent, chip);

            this.renderer.removeChild(parent, targetElement);
            this.renderer.appendChild(parent, targetElement);

            targetElement.focus();

          }

          this.renderer.setProperty(targetElement, 'textContent', '');


        }
      }

    }

  }

}
