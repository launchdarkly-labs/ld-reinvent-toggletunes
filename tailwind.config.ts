import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        context: "var(--context-color)",
        aws: '#FF9900',
        ldblue: '#3DD6F5',
        lddblue: '#3F8FFB',
        ldgreen: '#86E7A7',
        ldred: '#FF386B',
        lddred: '#C547B4',
        ldpurple: '#A34FDE',
        lddpurple: '#7B85E7',
        ldyellow: '#EBFF38',
        ldgray: '#282828',
        ldgraytext: '#BCBEC0',
        ldhl: '#EBFF38',
        ldgdcol1: '#DEE8C8',
        ldgdcol2: '#A7B6EA',
        ldinput: '#212121',
        ldinputback: '#282828',
        ldtsgray: '#D1D3D4', 
        ldbackground: '#191919',
        ldsiteblue: '#405BFF',
        ldsitehover: '#7084FF',
      },
    },
  },
  plugins: [],
}
export default config
