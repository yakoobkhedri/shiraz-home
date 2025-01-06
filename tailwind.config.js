/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary':'#FF9704',
        'secondary':'#0222C3',
        'dark': '#2C2C2C',
        'gray': '#F7F7F7'
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      padding:{
        'custom':'calc((100% - 1256px) / 2)'
       },
      fontFamily: {
        paydaRegular: "payda-Regular",
        paydaMedium: "payda-Medium",
        paydaSemiBold: "payda-SemiBold",
        paydaBold: "payda-Bold",
        paydaExtraBold: "payda-ExtraBold",
        paydaBlack: "payda-Black",
        MontserratRegular: "Montserrat-Regular",
        MontserratBold: "Montserrat-Bold",
      },
      maxWidth:{
        'content':'1256px',
      },
    }
},
}

