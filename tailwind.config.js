/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'Inter', 'sans-serif'],
      },
      colors: {
        // Ajout des couleurs manquantes demandées par votre CSS
        'terminal-bg': '#0a0f14',    // Fond principal très sombre
        'terminal-bg2': '#111820',   // Fond secondaire (cartes)
        'terminal-text': '#e2e8f0',  // Texte clair (proche du blanc)
        'terminal-green': '#00ff88', // Votre vert néon

        // Conservation de votre vert personnalisé
        green: {
          400: '#00ff88',
        }
      }
    },
  },
  plugins: [],
}
