function withOpacity(cssVariable) {
	return ({ opacityValue }) => {
		return opacityValue ? `rgba(var(${cssVariable}), ${opacityValue})` : `rgb(var(${cssVariable}))`;
	};
}

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			bgmain: withOpacity('--color-bg-main'),
			textmain: withOpacity('--color-text-main'),
		},
		extend: {
			fontFamily: {
				rounded: ['Rounded', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
