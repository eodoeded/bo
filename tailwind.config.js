// tailwind.config.js
export default {
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                'inter-light': ['Inter Light', 'Inter', 'sans-serif'],
                geist: ["Geist Sans", "sans-serif"],
                serif: ['"EB Garamond"', 'serif'],
            },
            backgroundImage: {
                'body-gradient': 'linear-gradient(180deg, #12110D 0%, #22201A 100%)',
            },
            colors: {
                ethicronics: {
                    red: '#C8372D',
                    cream: '#F4F4F0',
                }
            }
        },
    },
}
