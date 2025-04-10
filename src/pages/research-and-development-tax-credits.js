import { useState, useRef } from 'react';
import Head from "next/head";

import {
    Box,
  Flex,
  VStack,
  Link as ChakraLink,
  Heading,
  Text,
    Container,
  Spacer,
  } from '@chakra-ui/react';

  import Navbar from '../components/Navbar';
  import Footer from '../components/Footer';
  import pingDivider from '../components/pingDivider'

// Define the sections data
const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'activities', title: 'Qualifying Activities' },
  { id: 'calculation', title: 'Calculating the Credit' },
  { id: 'how-we-help', title: 'How We Help' },
];

export default function RnDTaxCreditsPage() {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || ''); // Initialize with the first section id

  // Placeholder background image URL (replace with your desired stock image)
  const backgroundImageUrl = 'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744286028/Graphic_waves_qtvac7.svg'; // Example image

  const handleLinkClick = (id) => {
    setActiveSection(id);
    // Get the scrollable container
    const mainContent = document.getElementById('main-content-area');
    // Get the target element
    const element = document.getElementById(id);

    if (mainContent && element) {
        // Calculate the target element's position relative to the scrollable container's top
        const offsetTop = element.offsetTop;
        // Get the scroll-margin-top value applied to the element (adjust the default '0' if needed)
        const scrollMarginTop = parseInt(window.getComputedStyle(element).scrollMarginTop, 10) || 0;

        // Scroll the container so the element's top (minus the margin) aligns with the container's top
        mainContent.scrollTo({
            top: offsetTop - scrollMarginTop,
            behavior: 'smooth',
        });
    }
  };

  // Style for the active link (glow effect)
  const activeLinkStyle = {
    fontWeight: 'bold',
    color: 'teal.300', // Use a theme color
    textDecoration: 'none', // Remove underline if default link has it
    // Simple glow using boxShadow
    // boxShadow: `0 0 8px 2px teal.200`,
    // Apply rounded corners if desired
    // borderRadius: 'md',
    // Add some padding for the glow effect visual space
    // p: 2,
    // mx: -2, // Adjust margin to keep alignment consistent with padding
  };

    return (
    // Set height to 100vh and use flex column layout
    <Box
      h={{base: '200vh', md: "100vh"}} // Exact viewport height
      display="flex"
      flexDirection="column"
      bgImage={`url('${backgroundImageUrl}')`}
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed" // Keeps the background fixed
      position="relative" // Needed for the overlay
      _before={{ // Overlay for readability
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,        
        bgGradient:"to-b",
        gradientFrom:'blackAlpha.500',
        gradientTo:'#000819',
        opacity:1,
        zIndex: 1,
      }}
      // Removed global scrollBehavior, apply it to scrollable container instead
    >

      <Head>
        <title>Research and Development Tax Credits | Ashton & Carrington</title>
        <meta name="description" content="Empowering Innovation and Financial Growth Through Expertise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Keep Navbar above overlay */}
      <Box position="relative" zIndex={2}>
        <Navbar />
      </Box>

      {/* Container fills space, contains children, uses flex column */}
      <Container
        maxW="container.xl"
        py={10}
        position="relative"
        zIndex={2} /* Content above overlay */
        flex="1" /* Grow vertically */
        overflow="hidden" /* Prevent container scroll */
        display="flex" /* Use flex for children */
        flexDirection="column" /* Stack title and flex row */
      >
          <Text
              fontFamily='Poppins'
              fontSize='2rem' // 32px
              lineHeight='3rem' // 48px
              color='white'
              mb={8}
            >
              Research and Development Tax Credits
            </Text>

            <pingDivider />

        {/* Flex row fills remaining space in container */}
        <Flex direction={['column', 'column', 'row']} gap={10} flex="1" overflow="hidden">
          {/* Left Sidebar */}
          <Box
            as="nav" // Use nav for semantic sidebar
            w={['full', 'full', '250px']} // Full width on small screens, fixed width on larger
            position={['relative', 'relative', 'sticky']} // Sticky sidebar on large screens
            top={[0, 0, '2rem']} // Adjust top position as needed
            alignSelf="flex-start" // Prevent stretching vertically
            p={4}
            // bg="rgba(26, 32, 44, 0.8)" // Slightly transparent background for sidebar
            borderRadius="md"
            fontFamily='Poppins'
            // Add max height and vertical scroll for sidebar if its content overflows
            // Adjust 10rem based on actual header/footer/padding heights
            maxH={['auto', 'auto', 'calc(100vh - 10rem)']}
            overflowY="auto"

          >

            <VStack align="stretch" spacing={3}>
              {sections.map((section) => (
                // Replace the outer Box with Flex for horizontal alignment
                <Flex key={section.id} align="center" gap={3}> 
                  {/* Dot and Line Column */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    // Removed mt="-2" as vertical alignment is handled by Flex parent
                  >
                    {/* Green Dot Container div */}
                    <Box
                      // w="4" 
                      // h="4" 
                      // bg="green.500" // Corresponds to tw-bg-green-500
                      // borderRadius="full" // Corresponds to tw-rounded-full
                      // position="relative" // Corresponds to tw-relative
                      // zIndex="10" // Corresponds to tw-z-10
                    >
                      {/* Inner Animated Dot div */}
                      <Box
                        w="5" 
                        h="5" 
                        bg="#ADF5F7" 
                        borderRadius="full" 
                        position="relative" 
                        zIndex="10"
                      />
                    </Box>

                    {/* Vertical Line div */}
                    <Box
                      w="0.25rem" // Corresponds to tw-w-1 (0.25rem)
                      h="1.5rem" // Reduced height slightly for better visual balance
                      bg={'gray.200'} // Default light mode
                      _dark={{
                          bg: 'gray.500' // Override for dark mode
                      }}
                      borderRadius="full" // Corresponds to tw-rounded-full
                      // Removed mt="-2"
                    />
                  </Box>
                  
                  {/* Link */}
                  <ChakraLink
                    href="#" // Use # and rely on onClick handler
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default hash jump
                      handleLinkClick(section.id);
                    }}
                    color="white"
                    _hover={{
                      color: 'white',
                      textDecoration: 'underline',
                    }}
                    fontFamily="Poppins"
                    // Apply active style conditionally
                    // Removed mx: -2 as padding provides spacing within Flex
                    {...(activeSection === section.id ? activeLinkStyle : { p: 2 })} 
                    transition="all 0.2s ease-in-out" // Smooth transition for style changes
                  >
                    {section.title}
                  </ChakraLink>
                </Flex> // End Flex container for item
              ))}
            </VStack>
          </Box>

          {/* Right Content Area: Scrolls internally */}
          <Box
            id="main-content-area" // ID to target for scrolling
            as="main" // Use main for semantic content area
            flex="1" // Takes remaining space
            borderRadius="md"
            fontFamily='Poppins'
            color='white' // Text color for content within
            h="100%" // Fill height of parent flex container
            overflowY="auto" // Enable vertical scroll ONLY for this box
            scrollBehavior="smooth" // Apply smooth scroll to this container
            p={6} // Add padding inside the scrollable area
            sx={{
              '::-webkit-scrollbar': {
                display: 'none', // Safari and Chrome
              },
              'scrollbarWidth': 'none', // Firefox
              '-ms-overflow-style': 'none', // IE and Edge
            }}
          >
            <Text
              fontFamily='Poppins'
              fontSize='2rem' // 32px
              lineHeight='3rem' // 48px
              color='white'
              textTransform='uppercase'
              mb={6}
            >
              Strategic Research & Development Tax Solutions for For Forward-Thinking Businesses
            </Text>

            {sections.map((section, index) => (
              // Add scrollMarginTop to offset fixed/sticky elements when scrolling to ID
              // Adjust '8rem' based on the actual height above this scrollable area
              <Box
                  key={section.id}
                  id={section.id}
                  scrollMarginTop="8rem" // CSS scroll margin anchor positioning
                  mb={8} // Keep margin between sections
              >
                <Heading size="xl" mb={4} color="white" fontFamily='Poppins'>
                  {section.title}
                </Heading>
                <Text color="white" lineHeight="tall">
                  {/* Placeholder Text - Replace with your actual content */}
                  This is the placeholder content for the "{section.title}" section.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Repeat this or add more relevant content for each section.
                  <br/><br/>
                  You can add more paragraphs, lists, images, or other components here as needed for each specific section of the R&D Tax Credits information.
                  Ensure the content is long enough to demonstrate the scrolling behavior effectively.
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Container>

      {/* Keep Footer above overlay */}
      <Box position="relative" zIndex={2}>
        <Footer />
      </Box>
      </Box>
  );
}