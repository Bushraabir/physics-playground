/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust the path as per your project
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'Arial', 'sans-serif'], // Use modern fonts for readability
                serif: ['Merriweather', 'serif'], // Use serif fonts for academic themes
            },
            colors: {
                dark: '#0a0a0a', // Primary dark background color
                primary: '#1e293b', // Deep gray for card backgrounds
                accent: '#38bdf8', // Tailwind's Sky blue for links and accents
                secondary: '#9333ea', // Purple for interactive elements
                whiteSmoke: '#f5f5f5', // Light white for smooth readability
            },
            boxShadow: {
                glow: '0 0 15px rgba(147, 51, 234, 0.5)', // Glow effect for cards
            },
            animation: {
                fadeIn: 'fadeIn 1.5s ease-in-out',
                bounceTwice: 'bounce 1s ease-in-out 2',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}