import Head from 'next/head';
import { Box, Text, Image as ChakraImage } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import client from '../../sanity/lib/client'; // Import Sanity client
import { PortableText } from '@portabletext/react'; // Import PortableText
import { urlForImage } from '../../sanity/lib/image';

const InfoPage = ({ pageData }) => {
  const { title, secondTitle, secondIntroText, introText, contentBlocks } = pageData || {}; // Destructure with default empty object to avoid errors

  console.log('introText:', introText)

  return (
    <Box
        bg={'#00ABF0'}      
        minH={'100vh'}
    >
      <Head>
        <title>{title || 'Info'}</title>
        <meta name="description" content="Information page for Afropocene StudioLab" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;0,700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar /> {/* Navbar is always rendered here */}
      <Box px={{base: 12, lg: 48}} py={20}>
        {pageData ? ( // Conditionally render page content only if pageData exists
          <>
            <Text fontSize={{base: '2xl', md: '4xl'}} mb={2} 
            fontWeight={600}
            color='white' fontFamily={'Space Mono'}>
                {title || 'Welcome to the Info Page!'}
            </Text>


            {introText && (
              Array.isArray(introText) ? (
                <Box color='white' fontFamily={'Space Mono'}>
                  <PortableText value={introText} />
                </Box>
              ) : (
                <Text color='white' fontFamily={'Space Mono'} whiteSpace="pre-wrap">
                  {introText}
                </Text>
              )
            )}

            {secondTitle && (
            <Text fontSize={{base: '2xl', md: '3xl'}} mb={0} mt={12}
            fontWeight={600}
            color='white' fontFamily={'Space Mono'}>

                {secondTitle}
              </Text>
            )}
            {secondIntroText && (
              Array.isArray(secondIntroText) ? (
                <Box color='white' fontFamily={'Space Mono'}>
                  <PortableText value={secondIntroText} />
                </Box>
              ) : (
                <Text color='white' fontFamily={'Space Mono'} whiteSpace="pre-wrap" mb={4}>
                  {secondIntroText}
                </Text>
              )
            )}

            {contentBlocks && contentBlocks.map((block, index) => (
              <Box key={index} mt={8} mb={8}>
                <Box display={{ base: 'block', md: 'flex' }} gap={{ base: 0, md: 8 }} alignItems="flex-start">
                  {block.image && (
                    <Box width={{ base: '100%', md: '260px' }} maxW={{ base: '100%', md: '260px' }} flexShrink={0} mb={{ base: 4, md: 0 }}>
                      <ChakraImage
                        src={urlForImage(block.image).width(1200).url()}
                        alt={block.altText || block.heading || 'Content image'}
                        borderRadius="md"
                        width="100%"
                        height="auto"
                      />
                    </Box>
                  )}
                  <Box width={{ base: '100%', md: 'auto' }} flex={{ base: 'none', md: 1 }}>
                    <Text color='white' fontFamily={'Space Mono'} fontSize="xl" fontWeight="bold">
                      {block.heading}
                    </Text>
                    {block.paragraph && (
                      <Box color='white' fontFamily={'Space Mono'} mt={4}>
                        <PortableText value={block.paragraph} />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        ) : (
          <Text color='white' fontFamily={'Space Mono'} p={8}>Loading or no data available...</Text>
        )}
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  const query = `*[_type == "infoPage"][0]{
    title,
    secondTitle,
    secondIntroText,
    introText,
    contentBlocks[]{
      heading,
      paragraph,
      image,
      altText
    }
  }`;
  const pageData = await client.fetch(query);

  return {
    props: {
      pageData,
    },
  };
}

export default InfoPage;
