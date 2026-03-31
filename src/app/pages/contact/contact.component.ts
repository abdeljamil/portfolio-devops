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
    <main class="min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-2xl mx-auto z-10 relative"
          @fadeSlide>

      <div class="mb-10">
        <div class="text-green-400 text-xs tracking-[0.2em] uppercase font-mono mb-2">
          // Contact
        </div>
        <h1 class="text-4xl md:text-5xl tracking-tight text-slate-200"
            style="font-family: 'Syne', sans-serif; font-weight: 800">
          Discutons <span class="text-green-400">DevOps</span>
        </h1>
        <p class="text-slate-500 text-sm font-mono mt-4 leading-relaxed">
          Stagiaire motivé, toujours partant pour échanger sur le cloud, l'automatisation et le DevOps.
        </p>
      </div>

      <!-- Social links -->
      <div class="flex flex-wrap gap-3 mb-10">
        @for (link of socialLinks; track link.label) {
          <a [href]="link.url" target="_blank"
             class="flex items-center gap-2 font-mono text-xs text-slate-300 px-4 py-2.5
                    border border-white/10 rounded-lg no-underline
                    hover:border-green-400/40 hover:text-green-400 hover:-translate-y-0.5
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
              class="space-y-5 bg-[#0a1520] border border-white/[0.06] rounded-lg p-6">

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
            <label class="block font-mono text-xs text-slate-500 mb-1.5 tracking-wider uppercase">
              <span class="text-green-400">$</span> nom *
            </label>
            <input formControlName="name" type="text" placeholder="Votre nom"
                   class="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-2.5
                          font-mono text-sm text-slate-200 placeholder-slate-600
                          focus:outline-none focus:border-green-400/50 transition-all">
            @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
              <p class="text-red-400 text-xs font-mono mt-1">⚠ Ce champ est requis</p>
            }
          </div>

          <!-- Email -->
          <div>
            <label class="block font-mono text-xs text-slate-500 mb-1.5 tracking-wider uppercase">
              <span class="text-green-400">$</span> email *
            </label>
            <input formControlName="email" type="email" placeholder="votre@email.com"
                   class="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-2.5
                          font-mono text-sm text-slate-200 placeholder-slate-600
                          focus:outline-none focus:border-green-400/50 transition-all">
            @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
              <p class="text-red-400 text-xs font-mono mt-1">⚠ Email invalide</p>
            }
          </div>

          <!-- Message -->
          <div>
            <label class="block font-mono text-xs text-slate-500 mb-1.5 tracking-wider uppercase">
              <span class="text-green-400">$</span> message *
            </label>
            <textarea formControlName="message" rows="5" placeholder="Votre message..."
                      class="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-2.5
                             font-mono text-sm text-slate-200 placeholder-slate-600
                             focus:outline-none focus:border-green-400/50 transition-all resize-none">
            </textarea>
            @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
              <p class="text-red-400 text-xs font-mono mt-1">⚠ Message trop court (min. 10 caractères)</p>
            }
          </div>

          <!-- Submit -->
          <button type="submit"
                  [disabled]="contactForm.invalid"
                  class="w-full font-mono text-xs uppercase tracking-widest py-3 rounded font-bold
                         bg-green-400 text-[#050a0e] cursor-pointer border-none
                         disabled:opacity-40 disabled:cursor-not-allowed
                         hover:shadow-[0_8px_24px_rgba(0,255,136,0.3)] hover:-translate-y-0.5
                         transition-all duration-200">
            @if (sending()) { ⏳ Envoi en cours... }
            @else { 🚀 Envoyer le message }
          </button>
        </form>
      } @else {
        <div class="bg-[#0a1520] border border-white/[0.06] rounded-lg p-8 text-center" @fadeSlide>
          <div class="text-5xl mb-4">✅</div>
          <h3 class="text-xl text-green-400 mb-2"
              style="font-family: 'Syne', sans-serif; font-weight: 700">
            Message envoyé !
          </h3>
          <p class="font-mono text-sm text-slate-500 mb-4">Je vous répondrai dans les plus brefs délais.</p>
          <button (click)="submitted.set(false)"
                  class="font-mono text-xs text-green-400 border border-green-400/30 px-4 py-2 rounded
                         hover:border-green-400 transition-colors bg-transparent cursor-pointer">
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
