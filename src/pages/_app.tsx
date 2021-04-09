import { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import { SidebarDrawerProdivder } from '../contexts/SidebarDrawerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <SidebarDrawerProdivder>
        <Component {...pageProps} />
      </SidebarDrawerProdivder>
    </ChakraProvider>
  )
}

export default MyApp
