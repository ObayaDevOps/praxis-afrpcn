import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { motion } from "framer-motion";

import 'focus-visible/dist/focus-visible';

import client from '../../sanity/lib/client';

import {TypewriterText, TypewriterTextMobile } from '../components/typewriter'

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


export default function Home({ mainHeading, subHeading, description, clickToEnterText }) {

  return (
    <Box
      //bg={'#37C6FF'}
      bg={'#00ABF0'}      

      minH={'100vh'}
      // p={20}
      // display="flex"
      // flexDirection="column"
      // position="relative"
      // overflow="hidden"
    >
      <Head>
        <title>AFRPCN - World Building Through Art</title>
        <meta name="description" content={'Worldbuilding Through Art - Imagining Futures of Liberation'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/AFRPCN.svg" />
      </Head>

      <Navbar bg={{base: 'transparent', lg: 'none'}} />




      <Box p={{base: 10, md: 24}} mt={-6}>


      <Box display={{base: 'none', lg: 'flex'}}>
        <TypewriterText 
          mainHeading={mainHeading}
          subHeading={subHeading}
          description={description}
        />
      </Box>

      <Box display={{base: 'flex', lg: 'none'}} mt={8}>
        <TypewriterTextMobile 
          mainHeading={mainHeading}
          subHeading={subHeading}
          description={description}
        />
      </Box>

      {/* <Box>
        <Text color=" #ffffff" fontFamily={"Space Mono"} fontSize ={"1.5rem"} fontWeight={600}
        >
      Our Praxis Lab at Afropocene StudioLab is in motion—a space where artists and thinkers gather to imagine and create liberated futures.

      Rooted in African ancestral knowledge and Black liberation theories, we’re exploring artistic purpose, radical imagination, and art as a tool for transformation.

      Facilitated by Tracian Meikle with guest mentors, this lab is a collective journey toward freedom.
      </Text>
      </Box> */}

        {/* <Heading
        pb={4}
                lineHeight={1.1}
                fontWeight={600}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: '3xl', sm: '4xl', lg: '7xl' }}>
          World building Through Art: 
          </Heading>

        <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: '3xl', sm: '4xl', lg: '7xl' }}>
          Imagining Futures of Liberation
        </Heading> */}

        {/* <Text
        pt={6}
        lineHeight={1.1}
                fontWeight={400}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: 'xl', lg: '3xl' }}>
           Tracian Meikle
        </Text> */}
        {/* <Text
        pt={2}
        lineHeight={1.1}
                fontWeight={400}
                fontFamily='Space Mono' 
                color='white'
                fontSize={{ base: 'md', lg: 'xl' }}>
           With Sponsorship From: Doen Foundation, British Council
        </Text> */}


      <Link a='a' href='/enter' pt={20}
      position='absolute'
      bottom={{base: 50, lg: 10}}
      left='50%'
      transform='translateX(-50%)'
      pb={10}
      >
        <Text
        color='white'
        fontFamily='Space Mono'
        fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}
        textDecoration='underline'
        // style={{ position: 'absolute', bottom: 100, left: 100 }}

        >
          {clickToEnterText}
        </Text>
      </Link>
      </Box>

      

      {/* <Box position="absolute" bottom={{base:"40", md: "0"}} right={{base:"10", md: "0"}} p={{base: 0, md: 20}}>

      <HStack spacing={8}>
      <ChakraImage
                  mt={2}
                  mr={8}

                      src={'https://cdn.sanity.io/images/6c1aac3a/production/f8311d5467a8daa5e57b7ccba1192bb5b9be39a8-1200x1200.png'}
                      alt="Doen Logo"
                      height={{base: '40px', md: '80px'}} // Adjust height as needed
                      width={'auto'} // Maintain aspect ratio
                      // ml={'64px'}
                  />
        <ChakraImage
                  mt={2}
                  mr={8}
                      src={'https://cdn.sanity.io/images/6c1aac3a/production/422f1d9371c893ff19ed6ce244b034adf5f67f0b-1280x368.png'}
                      alt="British Council Logo"
                      height={{base: '40px', md: '80px'}} // Adjust height as needed
                      width={'auto'} // Maintain aspect ratio
                      // ml={'64px'}
                  />
      <ChakraImage
                  mt={2}
                  mr={8}

                      src={'https://cdn.sanity.io/images/6c1aac3a/production/b01e23522fd2ef33c1e1226e3b828342176e7082-551x480.png'}
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

export async function getServerSideProps() {
  const query = `*[_type == "pageContent"][0]{
    mainHeading,
    subHeading,
    description,
    clickToEnterText
  }`;
  const data = await client.fetch(query);

  return {
    props: {
      mainHeading: data?.mainHeading || '',
      subHeading: data?.subHeading || '',
      description: data?.description || '',
      clickToEnterText: data?.clickToEnterText || 'Click to Enter', // Provide a default
    },
  };
}