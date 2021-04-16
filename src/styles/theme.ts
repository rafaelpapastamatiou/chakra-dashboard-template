import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181818",
      "800": "#1f1f1f",
      "700": "#353535",
      "600": "#4b4b4b",
      "500": "#616161",
      "400": "#797979",
      "300": "#969696",
      "200": "#b3b3b3",
      "100": "#d1d1d1",
      "50": "#eeeeee"
    }
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto"
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    }
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          cursor: 'pointer'
        }
      }
    }
  }
})