import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss').ProcessorOptions} */
const postcssConfig = {
  plugins: {
    tailwindcss,
    autoprefixer,
  },
};

export default postcssConfig;