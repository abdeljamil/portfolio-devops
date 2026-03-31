import { Component, input, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="space-y-1">
      <div class="h-[3px] bg-white/5 rounded-full overflow-hidden">
        <div #bar
             class="h-full rounded-full"
             [style.background-color]="color()"
             style="width: 0%; transition: width 1.2s ease">
        </div>
      </div>
      @if (showLabel()) {
        <div class="text-right text-[10px] text-slate-500 font-mono">{{ value() }}%</div>
      }
    </div>
  `
})
export class ProgressBarComponent implements AfterViewInit {
  value = input<number>(0);
  color = input<string>('#00ff88');
  showLabel = input<boolean>(true);

  private el: ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = this.el.nativeElement.querySelector('[data-bar]') as HTMLElement;
            const div = this.el.nativeElement.querySelector('div > div') as HTMLElement;
            if (div) {
              setTimeout(() => {
                div.style.width = `${this.value()}%`;
              }, 100);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(this.el.nativeElement);
  }
}
