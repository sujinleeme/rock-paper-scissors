import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: () => ({
    body: {
      color: 'gray.700',
    },
  }),
}

const theme = extendTheme({
  styles,
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    lightGreen: {
      500: '#68D391',
      700: '#48BB78',
    },
  },
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
})

export default theme
