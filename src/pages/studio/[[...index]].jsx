import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

import {
  Box
} from '@chakra-ui/react';

export default function StudioPage() {
  return (
    <Box minHeight={'120vh'} position="fixed" top="0" minWidth={'100vw'} zIndex={9999}>
        <Head>
            <title>Editor Studio | AFRPCN - World Building  </title>
            <meta name="description" content="AFRPCN Webpage" />
            <link rel="icon" href="/cat-face.svg" />

        </Head>
        
        <NextStudio config={config} />
      </Box>
  )
}