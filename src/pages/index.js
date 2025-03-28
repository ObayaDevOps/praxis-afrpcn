import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import styles from "@/styles/Home.module.css";

import {
  Box,
  Text,
} from '@chakra-ui/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Home() {
  return (
    <Box>
      <Head>
        <title>Ashton & Carrington</title>
        <meta name="description" content="Ashton & Carrington" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text fontFamily={'neobrutalismFont1'}>
        This is some styled Text in Unbounded
      </Text>
      <Text fontFamily={'geistSans'}>
        This is some styled Text in Geist Sans
      </Text>
      <Text fontFamily={'geistMono'}>
        This is some styled Text in Geist Mono
      </Text>

    </Box>
  );
}
