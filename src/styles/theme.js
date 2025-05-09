// import { extendTheme } from '@chakra-ui/react'
import { createSystem, defaultConfig } from "@chakra-ui/react"
import { Space_Mono, Noto_Sans_Coptic, Noto_Sans_Egyptian_Hieroglyphs,
   Noto_Sans_Bamum, Noto_Sans_Meroitic, Noto_Sans_Ethiopic, Noto_Sans_NKo_Unjoined,
   Noto_Sans_NKo
     } from 'next/font/google'
import { textStyles } from './textStyles'




// Font configurations


export const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const notoSansCoptic = Noto_Sans_Coptic({
  variable: "--font-noto-sans-coptic",
  weight: ["400"],
  subsets: ["coptic"],
})

export const notoSansEgyptianHieroglyphs = Noto_Sans_Egyptian_Hieroglyphs({
  variable: "--font-noto-sans-egyptian-hieroglyphs",
  weight: ["400"],
  subsets: ["egyptian-hieroglyphs"],
})

export const notoSansBamum = Noto_Sans_Bamum({
  variable: "--font-noto-sans-bamum",
  weight: ["400"],
  subsets: ["bamum"],
})

export const notoSansMeroitic = Noto_Sans_Meroitic({
  variable: "--font-noto-sans-meroitic",
  weight: ["400"],
  subsets: ["meroitic"],
})

export const notoSansEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-sans-ethiopic",
  weight: ["400"],
  subsets: ["ethiopic"],
})

export const notoSansNkoUnjoined = Noto_Sans_NKo_Unjoined({
  variable: "--font-noto-sans-nko-unjoined",
  weight: ["400"],
  subsets: ["nko"],
})

export const notoSansNko = Noto_Sans_NKo({
  variable: "--font-noto-sans-nko",
  weight: ["400"],
  subsets: ["nko"],
})

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        spaceMono: { value: `var(--font-space-mono)` },
        notoSansCoptic: { value: `var(--font-noto-sans-coptic)` },
        notoSansEgyptianHieroglyphs: { value: `var(--font-noto-sans-egyptian-hieroglyphs)` },
        notoSansBamum: { value: `var(--font-noto-sans-bamum)` },
        notoSansMeroitic: { value: `var(--font-noto-sans-meroitic)` },
        notoSansEthiopic: { value: `var(--font-noto-sans-ethiopic)` },
        notoSansNkoUnjoined: { value: `var(--font-noto-sans-nko-unjoined)` },
        notoSansNko: { value: `var(--font-noto-sans-nko)` },
      },
    },
    textStyles,
  },
})

export default system 