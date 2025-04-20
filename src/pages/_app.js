// import '@/styles/globals.css'
// import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "@/components/ui/provider"
import theme from '../styles/theme'

import { Global, css } from '@emotion/react'

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

function App({ Component, pageProps }) {
  return (
    <Provider theme={theme}>
        <Global styles={GlobalStyles} />
        <Component {...pageProps} />
    </Provider>
  )
}

export default App 
