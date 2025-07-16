import Head from 'next/head';
import { Box, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import client from '../../sanity/lib/client'; // Import Sanity client
import { PortableText } from '@portabletext/react'; // Import PortableText

const InfoPage = ({ pageData }) => {
  const { title, introText, contentBlocks } = pageData || {}; // Destructure with default empty object to avoid errors

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
      <Box px={{base: 12, lg: 44}} py={20}>
        {pageData ? ( // Conditionally render page content only if pageData exists
          <>
            <Text fontSize={{base: '2xl', md: '4xl'}} mb={4} 
            fontWeight={600}
            color='white' fontFamily={'Space Mono'}>
                {title || 'Welcome to the Info Page!'}
            </Text>

            {introText && (
              <Box color='white' fontFamily={'Space Mono'}>
                <PortableText value={introText} />
              </Box>
            )}

            {contentBlocks && contentBlocks.map((block, index) => (
              <Box key={index} mt={8} mb={8}>
                <Text color='white' fontFamily={'Space Mono'} fontSize="2xl" fontWeight="bold">
                  {block.heading}
                </Text>
                {block.paragraph && (
                  <Box color='white' fontFamily={'Space Mono'}>
                    <PortableText value={block.paragraph} />
                  </Box>
                )}
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
    introText,
    contentBlocks[]{
      heading,
      paragraph
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
