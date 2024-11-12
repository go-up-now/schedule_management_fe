
module.exports = {
  content: [
    './index.html', // Đảm bảo bạn đưa vào index.html
    './src/**/*.{js,jsx,ts,tsx}', // Bao gồm tất cả các file mã nguồn
    'node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {},
  },
  darkMode: 'false',
  plugins: [
    'flowbite/plugin'
  ],
}
