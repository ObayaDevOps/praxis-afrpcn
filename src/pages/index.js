
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
  HStack,
  Image as ChakraImage,
  Link
} from '@chakra-ui/react';


import Navbar from '../components/Navbar';


export default function Home({  }) {

  return (
    <Box
      bg={'#37C6FF'}
      minH={'100vh'}
      // p={20}
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

      <Navbar bg={{base: 'transparent', lg: 'none'}} />

      <Box p={{base: 16, md: 24}}>
        <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: '3xl', sm: '4xl', lg: '7xl' }}>
          World building Through Art -
          </Heading>

        <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: '3xl', sm: '4xl', lg: '7xl' }}>
          Imagining Futures of Liberation
        </Heading>

        <Text
        pt={6}
        lineHeight={1.1}
                fontWeight={400}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: '2xl', sm: '4xl', lg: '4xl' }}>
           Tracian Meikle
        </Text>
        {/* <Text
        pt={2}
        lineHeight={1.1}
                fontWeight={400}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: 'md', lg: 'xl' }}>
           With Sponsorship From: Doen Foundation, British Council
        </Text> */}


      <Link a='a' href='/enter' pt={20}>
        <Text
        color='white'
        fontFamily='Space Mono' 
        fontSize={{ base: '2xl', sm: '2xl', lg: '2xl' }}
        textDecoration='underline'>
          Click to Enter
        </Text>
      </Link>
      </Box>

      {/* <Box position="absolute" bottom={{base:"40", md: "0"}} right={{base:"10", md: "0"}} p={{base: 0, md: 20}}>

      <HStack spacing={8}>
      <ChakraImage
                  mt={2}
                  mr={8}

                      src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1747920205/praxis-labs-logo_olljaf.png'}
                      alt="Doen Logo"
                      height={{base: '40px', md: '80px'}} // Adjust height as needed
                      width={'auto'} // Maintain aspect ratio
                      // ml={'64px'}
                  />
        <ChakraImage
                  mt={2}
                  mr={8}
                      src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1747919860/BritishCouncil_baddf4.png'}
                      alt="British Council Logo"
                      height={{base: '40px', md: '80px'}} // Adjust height as needed
                      width={'auto'} // Maintain aspect ratio
                      // ml={'64px'}
                  />
      <ChakraImage
                  mt={2}
                  mr={8}

                      src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1747919874/Doen-Logo_nn8ua7.png'}
                      alt="Doen Logo"
                      height={{base: '40px', md: '80px'}} // Adjust height as needed
                      width={'auto'} // Maintain aspect ratio
                      // ml={'64px'}
                  />

      </HStack>
      </Box> */}


    </Box>
  );
}