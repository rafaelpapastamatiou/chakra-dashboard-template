import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { theme } from '../styles/theme'
import { SidebarDrawerProdivder } from '../contexts/SidebarDrawerContext'

import { makeServer } from '../services/mirage'
import { queryClient } from '../services/queryClient'

if(process.env.NODE_ENV === 'development') {
  makeServer()
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS>
        <SidebarDrawerProdivder>
          <Component {...pageProps} />
        </SidebarDrawerProdivder>
      </ChakraProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default MyApp
