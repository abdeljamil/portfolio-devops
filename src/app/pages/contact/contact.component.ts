import {
    animate,
    style,
    transition,
    trigger
} from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <main class="min-h-screen px-5 md:px-10 pt-24 pb-20 max-w-2xl mx-auto z-10 relative"
          @fadeSlide>

      <div class="mb-10">
        <div class="text-[11px] tracking-[0.25em] uppercase text-neutral-600 mb-3">
          Contact
        </div>
        <h1 class="font-display text-4xl md:text-5xl tracking-tight text-white font-bold">
          Discutons <span class="text-neutral-400">DevOps</span>
        </h1>
        <p class="text-neutral-500 text-sm mt-4 leading-relaxed">
          Stagiaire motivé, toujours partant pour échanger sur le cloud, l'automatisation et le DevOps.
        </p>
      </div>

      <!-- Social links -->
      <div class="flex flex-wrap gap-3 mb-10">
        @for (link of socialLinks; track link.label) {
          <a [href]="link.url" target="_blank"
             class="flex items-center gap-2 font-mono text-xs text-neutral-400 px-4 py-2.5
                    border border-white/[0.1] no-underline
                    hover:border-white/25 hover:text-white hover:-translate-y-0.5
                    transition-all duration-200">
            <span>{{ link.icon }}</span>
            <span>{{ link.label }}</span>
          </a>
        }
      </div>

      <!-- Divider -->
      <div class="font-mono text-xs text-slate-600 mb-8 flex items-center gap-4">
        <div class="flex-1 h-px bg-white/5"></div>
        <span>ou envoie un message</span>
        <div class="flex-1 h-px bg-white/5"></div>
      </div>

      <!-- Form -->
      @if (!submitted()) {
        <form [formGroup]="contactForm"
              (ngSubmit)="onSubmit()"
              class="space-y-5 bg-neutral-950 border border-white/[0.08] p-6">

          <!-- Terminal bar -->
          <div class="flex items-center gap-2 -mx-6 -mt-6 mb-6 px-4 py-2.5
                       bg-white/[0.02] border-b border-white/[0.06] rounded-t-lg">
            <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            <span class="ml-auto text-slate-500 text-xs font-mono">send-message.sh</span>
          </div>

          <!-- Name -->
          <div>
            <label class="block font-mono text-xs text-neutral-500 mb-1.5 tracking-wider uppercase">
              nom *
            </label>
            <input formControlName="name" type="text" placeholder="Votre nom"
                   class="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5
                          font-mono text-sm text-neutral-200 placeholder-neutral-600
                          focus:outline-none focus:border-white/30 transition-all">
            @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
              <p class="text-red-400 text-xs font-mono mt-1">⚠ Ce champ est requis</p>
            }
          </div>

          <!-- Email -->
          <div>
            <label class="block font-mono text-xs text-neutral-500 mb-1.5 tracking-wider uppercase">
              email *
            </label>
            <input formControlName="email" type="email" placeholder="votre@email.com"
                   class="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5
                          font-mono text-sm text-neutral-200 placeholder-neutral-600
                          focus:outline-none focus:border-white/30 transition-all">
            @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
              <p class="text-red-400 text-xs font-mono mt-1">⚠ Email invalide</p>
            }
          </div>

          <!-- Message -->
          <div>
            <label class="block font-mono text-xs text-neutral-500 mb-1.5 tracking-wider uppercase">
              message *
            </label>
            <textarea formControlName="message" rows="5" placeholder="Votre message..."
                      class="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5
                             font-mono text-sm text-neutral-200 placeholder-neutral-600
                             focus:outline-none focus:border-white/30 transition-all resize-none">
            </textarea>
            @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
              <p class="text-red-400 text-xs font-mono mt-1">⚠ Message trop court (min. 10 caractères)</p>
            }
          </div>

          <!-- Submit -->
          <button type="submit"
                  [disabled]="contactForm.invalid"
                  class="w-full font-mono text-xs uppercase tracking-widest py-3 font-bold
                         bg-white text-black cursor-pointer border-none
                         disabled:opacity-40 disabled:cursor-not-allowed
                         hover:bg-neutral-200 hover:-translate-y-0.5
                         transition-all duration-200">
            @if (sending()) { ⏳ Envoi en cours... }
            @else { 🚀 Envoyer le message }
          </button>
        </form>
      } @else {
        <div class="bg-neutral-950 border border-white/[0.08] p-8 text-center" @fadeSlide>
          <div class="text-5xl mb-4">✅</div>
          <h3 class="text-xl text-white mb-2 font-display font-bold">
            Message envoyé !
          </h3>
          <p class="font-mono text-sm text-neutral-500 mb-4">Je vous répondrai dans les plus brefs délais.</p>
          <button (click)="submitted.set(false)"
                  class="font-mono text-xs text-neutral-400 border border-white/20 px-4 py-2
                         hover:border-white/40 hover:text-white transition-colors bg-transparent cursor-pointer">
            Envoyer un autre message
          </button>
        </div>
      }
    </main>
  `
})
export class ContactComponent {
  private fb: FormBuilder = inject(FormBuilder);

  submitted = signal(false);
  sending = signal(false);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  socialLinks = [
    { icon: '📧', label: 'Email', url: 'mailto:votre@email.com' },
    { icon: '⌥', label: 'GitHub', url: 'https://github.com/pountounyinyi' },
    { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
  ];

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
      this.contactForm.reset();
    }, 1500);
  }
}
