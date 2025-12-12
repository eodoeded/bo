// tailwind.config.js
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                'inter-light': ['Inter Light', 'Inter', 'sans-serif'],
                montreal: ['PP Neue Montreal', 'sans-serif'],
                geist: ["Geist Sans", "sans-serif"],
                serif: ['"EB Garamond"', 'serif'],
                mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
            },
            backgroundImage: {
                'body-gradient': 'linear-gradient(180deg, #050505 0%, #0A0A0A 100%)',
            },
            colors: {
                ethicronics: {
                    red: '#C8372D',
                    cream: '#F4F4F0',
                }
            }
        },
    },
    plugins: [],
}
