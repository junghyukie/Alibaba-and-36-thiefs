/** @type {import('tailwindcss').Config} */
module.exports = {
        darkMode: ["class"],
        content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
        theme: {
        	name: 'Bluewave',
        	fontFamily: {
        		sans: [
        			'Open Sans',
        			'ui-sans-serif',
        			'system-ui',
        			'sans-serif',
        			'\\\\\\\\"Apple Color Emoji\\\\\\\\"',
        			'\\\\\\\\"Segoe UI Emoji\\\\\\\\"',
        			'\\\\\\\\"Segoe UI Symbol\\\\\\\\"',
        			'\\\\\\\\"Noto Color Emoji\\\\\\\\"'
        		]
        	},
        	extend: {
        		borderRadius: {
        			lg: 'var(--radius)',
        			md: 'calc(var(--radius) - 2px)',
        			sm: 'calc(var(--radius) - 4px)'
        		},
        		colors: {
        			background: 'hsl(var(--background))',
        			foreground: 'hsl(var(--foreground))',
        			card: {
        				DEFAULT: 'hsl(var(--card))',
        				foreground: 'hsl(var(--card-foreground))'
        			},
        			popover: {
        				DEFAULT: 'hsl(var(--popover))',
        				foreground: 'hsl(var(--popover-foreground))'
        			},
        			primary: {
        				DEFAULT: 'hsl(var(--primary))',
        				foreground: 'hsl(var(--primary-foreground))'
        			},
        			secondary: {
        				DEFAULT: 'hsl(var(--secondary))',
        				foreground: 'hsl(var(--secondary-foreground))'
        			},
        			muted: {
        				DEFAULT: 'hsl(var(--muted))',
        				foreground: 'hsl(var(--muted-foreground))'
        			},
        			accent: {
        				DEFAULT: 'hsl(var(--accent))',
        				foreground: 'hsl(var(--accent-foreground))'
        			},
        			destructive: {
        				DEFAULT: 'hsl(var(--destructive))',
        				foreground: 'hsl(var(--destructive-foreground))'
        			},
        			border: 'hsl(var(--border))',
        			input: 'hsl(var(--input))',
        			ring: 'hsl(var(--ring))',
        			chart: {
        				'1': 'hsl(var(--chart-1))',
        				'2': 'hsl(var(--chart-2))',
        				'3': 'hsl(var(--chart-3))',
        				'4': 'hsl(var(--chart-4))',
        				'5': 'hsl(var(--chart-5))'
        			}
        		}
        	},
        	fontSize: {
        		xs: [
        			'12px',
        			{
        				lineHeight: '19.200000000000003px'
        			}
        		],
        		sm: [
        			'14px',
        			{
        				lineHeight: '21px'
        			}
        		],
        		base: [
        			'16px',
        			{
        				lineHeight: '25.6px'
        			}
        		],
        		lg: [
        			'18px',
        			{
        				lineHeight: '27px'
        			}
        		],
        		xl: [
        			'20px',
        			{
        				lineHeight: '28px'
        			}
        		],
        		'2xl': [
        			'24px',
        			{
        				lineHeight: '31.200000000000003px'
        			}
        		],
        		'3xl': [
        			'30px',
        			{
        				lineHeight: '36px'
        			}
        		],
        		'4xl': [
        			'36px',
        			{
        				lineHeight: '41.4px'
        			}
        		],
        		'5xl': [
        			'48px',
        			{
        				lineHeight: '52.800000000000004px'
        			}
        		],
        		'6xl': [
        			'60px',
        			{
        				lineHeight: '66px'
        			}
        		],
        		'7xl': [
        			'72px',
        			{
        				lineHeight: '75.60000000000001px'
        			}
        		],
        		'8xl': [
        			'96px',
        			{
        				lineHeight: '100.80000000000001px'
        			}
        		],
        		'9xl': [
        			'128px',
        			{
        				lineHeight: '134.4px'
        			}
        		]
        	},
        	borderRadius: {
        		none: '0px',
        		sm: '6px',
        		DEFAULT: '12px',
        		md: '18px',
        		lg: '24px',
        		xl: '36px',
        		'2xl': '48px',
        		'3xl': '72px',
        		full: '9999px'
        	},
        	spacing: {
        		'0': '0px',
        		'1': '4px',
        		'2': '8px',
        		'3': '12px',
        		'4': '16px',
        		'5': '20px',
        		'6': '24px',
        		'7': '28px',
        		'8': '32px',
        		'9': '36px',
        		'10': '40px',
        		'11': '44px',
        		'12': '48px',
        		'14': '56px',
        		'16': '64px',
        		'20': '80px',
        		'24': '96px',
        		'28': '112px',
        		'32': '128px',
        		'36': '144px',
        		'40': '160px',
        		'44': '176px',
        		'48': '192px',
        		'52': '208px',
        		'56': '224px',
        		'60': '240px',
        		'64': '256px',
        		'72': '288px',
        		'80': '320px',
        		'96': '384px',
        		px: '1px',
        		'0.5': '2px',
        		'1.5': '6px',
        		'2.5': '10px',
        		'3.5': '14px'
        	}
        },
        plugins: [require('@tailwindcss/line-clamp'), require("tailwindcss-animate")],
        important: '#webcrumbs'
    }