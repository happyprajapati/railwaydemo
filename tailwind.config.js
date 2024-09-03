import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main":"#f9fafb",
        "bt":"#374151",
        "bt-tx":"#fafaf9",
      }
    },
  },
  plugins: [],
});

