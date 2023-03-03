module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      // Add your custom fonts and enjoy.
      'Inter': ["Circular Std", "Sans-serif"],
      'Odor': ["Odor Mean Chey", "Sans-serif"],
      'Coolvetica': ["Coolvetica", "Sans-serif"],
      'dash': ["Poppins", "Sans-serif"]
    },
    extend: {
      container: {
        center: true,
          padding: '1rem',
          screens: {
            sm: "100%",
            md: "100%",
            lg: "1024px",
            xl: "1259px"
         }

      },

      backgroundImage: {
        'hero-pattern': "url('/src/image/278820243_519085216602498_7294046859192740866_n.png')",
        'hero-Agancy': "url('/src/image/Rectangle 34624245.png')",
        'hero-player': "url('/src/image/Rectangle 34624246.png')",
        'hero-gallary': "url('/src/image/gallery.jpg')"
    
      },
      
      colors: {
        'text-body': '#515151',
        'bg-body': '#E5E5E5',
        'bg-yellow': '#D7C64F',
        'bg-hover-yellow': '#FDFAE6',
        'bg-gray': '#FBFBFB',
        'c-#BABBBE':'#BABBBE',
        'c-#EFDC59':'#EFDC59'
      },
      boxShadow: {
        'Tournaments': '2px 7px 182px 0px #C0CCD86E',
      }

    },
  },
  plugins: [],
}
