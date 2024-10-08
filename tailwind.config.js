/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D51B53",
        primaryDark: "#7F1032",
        textDarkColor: "#353546",
        textLightColor: "#858597",
        backgroundColor: "#F7F8FC",
        backgroundColor2: "#DFE0EB",
        backgroundColor3: "#F9CFE6",
        menuIconBackground: "#EAEAFF",
        borderColorLight: "#B8B8D2",
        sidebarBorderColor: "#E6E6E6",
        primary_3: "rgb(213,27,83, 3%)",
        notificationIconColor: "#AAACBD",
        successGreen: "#00BF63",
        modalBackground: "#911259",
        progressBarBackgroundColor: "#F4F3FD",
        authBackground: "#F0F0F2",
      },
    },
    fontFamily: {
      poppinsThin: "Poppins_100Thin",
      poppinsExtraThin: "Poppins_200ExtraLight",
      poppinsLight: "Poppins_300Light",
      poppinsRegular: "Poppins_400Regular",
      poppinsMedium: "Poppins_500Medium",
      poppinsSemiBold: "Poppins_600SemiBold",
      poppinsBold: "Poppins_700Bold",
      poppinsExtraBold: "Poppins_800ExtraBold",
      poppinsBlacks: "Poppins_900Black",
    },
  },
  plugins: [],
};
