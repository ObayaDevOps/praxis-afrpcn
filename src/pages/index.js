import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { geistSans, geistMono, spaceMono, poppins } from "@/styles/theme";

import {
  Box,
  Center,
  Text,
  Heading,
  VStack,
  Button,
  Container,
} from '@chakra-ui/react';

import { getCloudinaryImage, getCloudinaryImageBlur } from '../util/cloudinaryImageRetreival';
import ServicesSection from '../components/ServicesSection';
import WhoWeAreSection from '../components/WhoWeAreSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



export default function Home() {
  return (
    <Box
    // className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${poppins.variable}`}
      bg={'#000819'}
      minH={'100vh'}
      display="flex"
      flexDirection="column"
    >

      <Head>
        <title>Ashton & Carrington</title>
        <meta name="description" content="Empowering Innovation and Financial Growth Through Expertise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Box flex="1">
        <Box py={16}>
          <Center>
                <Image
                  src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744125894/Type_Default_Colour_Gradient_on_Blue_lgi2ha.svg'} 
                  alt="Nekosero Brand Logo"
                  width={611}
                  height={250}
                  priority
                  placeholder="blur"
                  blurDataURL={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744125894/Type_Default_Colour_Gradient_on_Blue_lgi2ha.svg'}
                />
          </Center>
          <Center mt={8} px={4}>
            <Heading
              as="h1"
              fontFamily="Poppins"
              fontSize={{ base: 'xl', md: '2rem' }}
              lineHeight={{ base: '2rem', md: '3rem' }}
              fontWeight={500}
              letterSpacing={'0.72px'}
              textAlign={'center'}
              bgClip="text"
              bgGradient="to-r"
              gradientFrom='#00DEE3'
              gradientTo='#5700C4'

              maxW="container.md"
            >
              Empowering Innovation and Financial Growth Through Expertise
            </Heading>
          </Center>
        </Box>

        <ServicesSection />

        <WhoWeAreSection />
      </Box>

      <Footer />

    </Box>
  );
}

