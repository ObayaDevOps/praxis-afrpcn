import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { geistSans, geistMono, spaceMono, poppins } from "@/styles/theme";
import { motion } from "framer-motion";

import 'focus-visible/dist/focus-visible';

import { Root as RotatingGallery } from '../components/RotatingGallery/rotatingGalleryContainer'

import {
  Box,
  Center,
  Text,
  Heading,
  VStack,
  Button,
  Container,
} from '@chakra-ui/react';


import Navbar from '../components/Navbar';


export default function Home({  }) {

  return (
    <Box
      bg={'#080707'}
      minH={'100vh'}
      // display="flex"
      // flexDirection="column"
      // position="relative"
      // overflow="hidden"
    >
      <Head>
        <title>AFRPCN - PRAXIS</title>
        <meta name="description" content={'Worldbuilding Through Art - Imagining Futures of Liberation'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/AFRPCN.svg" />
      </Head>

      {/* <Navbar bg={{base: 'transparent', lg: 'none'}} /> */}

      <Box >
        <RotatingGallery />
      </Box>


    </Box>
  );
}