// import '@/styles/globals.css'
// import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "@/components/ui/provider"


import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <Provider theme={theme}>
        <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp 
