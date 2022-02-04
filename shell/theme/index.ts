import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import foundations from './foundations'

const direction = 'ltr'

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
}

const styles = {
  global: {
    body: {
      fontFamily: 'body',
      lineHeight: 'base',
    },
    'h2': {
      fontSize: '4xl',
      fontWeight: 'bold',
      color: 'gray.800',
      lineHeight: 'tall',
    },
    a: {
      color: 'teal.500',
    },
  },
}

const theme = extendTheme({
  direction,
  ...foundations,
  config,
  styles
})

export default theme
