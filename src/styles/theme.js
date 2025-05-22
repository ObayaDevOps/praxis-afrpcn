// import { extendTheme } from '@chakra-ui/react'
import { createSystem, defaultConfig } from "@chakra-ui/react"
import { Poppins ,Space_Mono, Press_Start_2P, Pixelify_Sans, Silkscreen
     } from 'next/font/google'
// import { textStyles } from './textStyles'


export const pressStart2p = Press_Start_2P({
  variable: "--font-press-start-2p",
  weight: ["400"],
  subsets: ["latin"],
})


export const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  subsets: ["latin"],
})


export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

export const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
})


const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        logoFont: pressStart2p.style.fontFamily,
        logoFont2: { value: `var(--font-space-mono)` },
      },
    },
    // textStyles,
  },
})

export default system 