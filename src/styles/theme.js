// import { extendTheme } from '@chakra-ui/react'
import { createSystem, defaultConfig } from "@chakra-ui/react"


import {  Unbounded, Lexend_Mega, Public_Sans, Archivo, DM_Sans, Red_Hat_Text, 
  RocknRoll_One, Work_Sans,
  Noto_Serif, Zen_Kaku_Gothic_New, Dela_Gothic_One, Murecho
  } from 'next/font/google'

const neobrutalismFont1 = Unbounded({ subsets: [ 'latin' ], weight: ['400'] })




const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
          fonts: {
            heading: { value: `'Figtree', sans-serif` },
            body: { value: `'Figtree', sans-serif` },
            neobrutalismFont1: neobrutalismFont1.style.fontFamily,


          },
        },
      },

})

export default system 