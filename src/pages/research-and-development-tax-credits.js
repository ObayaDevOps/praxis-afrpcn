import { useState, useRef } from 'react';
import Head from "next/head";
import { ChevronDown } from 'lucide-react';

import {
  Box,
  Flex,
  VStack,
  Link as ChakraLink,
  Heading,
  Text,
  Container,
  Spacer,
  Accordion,
  Span,
  Separator
  } from '@chakra-ui/react';

  import Navbar from '../components/Navbar';
  import Footer from '../components/Footer';
  import VerticalStepperNav from '../components/VerticalStepperNav';

// Define the sections data based on the image
const sections = [
  { id: 'introduction', title: 'Empowering Innovation & Maximising Growth' },
  { id: 'qualifies', title: 'What Qualifies as R&D?' },
  { id: 'maximising-claim', title: 'Maximising Your Claim: The R&D Tax Credit Report' },
  { id: 'uk-scheme', title: 'Understanding the UK R&D Tax Credit Scheme' },
  { id: 'loss-making', title: 'Claiming R&D credits when loss making' },
  { id: 'partner', title: 'Why Partner with Ashton & Carrington?' },
  { id: 'get-started', title: 'Get Started Today' },
];

const accordionItems = [
  { value: "a", title: "Financial year ending 1st April 2024 – 31st March 2025", text: "Rate of enhanced expenditure is 186% which translates to if a business has £100,000 of qualifying R&D expenditure, it could claim a tax deduction worth £186,000. If the company is not loss-making, this will usually reduce the company’s taxable profit and therefore the corporation tax payable, meaning a 19%-25% (£35,340-£46,500 on £100,000 of qualifying R&D spend) benefit, depending on the company’s corporation tax rate. If the company is sufficiently loss-making and R&D intensive (above 30% of total expenditure is qualifying R&D expenditure), the deduction can be claimed at 14.5% as a tax credit (£26,970 on £100,000 of qualifying R&D spend), usually received in cash. If the company is sufficiently loss-making but not R&D intensive, the deduction can be claimed at 10% as a tax credit (£18,600 on £100,000 of qualifying R&D spend), usually received in cash." },
  { value: "b", title: "Second Item", text: "Some value 2..." },
  { value: "c", title: "Third Item", text: "Some value 3..." },
]


const AccordionComponent = () => {
  return (
    <Accordion.Root collapsible defaultValue={["b"]}>
      {accordionItems.map((item, index) => (
        <Accordion.Item key={index} value={item.value}
          my={'0.75rem'}
          borderRadius={'0.25rem'}
          borderColor={'#1A2130'}
          borderWidth={'1px'}
          bgGradient="to-r"
          gradientFrom='#000819'
          gradientTo='#1A2130'
          boxShadow={`0px 3px 3px 0px rgba(0,8,25,0.4)`}


        >
          <Accordion.ItemTrigger p={'0.5rem'}>
            <ChevronDown/>
            <Span flex="1">
              <Text               
                fontFamily='Poppins'
                fontSize='1rem' // 30px
                lineHeight='1.875rem' // 30px
                fontWeight='500'
                fontStyle='normal'
                color='white'
              >
                {item.title}
              </Text>
            </Span>
            {/* <Accordion.ItemIndicator /> */}
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
          <Separator borderColor={'#1A2130'} mx={'1rem'} />

            <Accordion.ItemBody p={'1rem'}>
              <Text
                fontFamily='Poppins'
                fontSize='1rem' // 16px
                lineHeight='1.875rem' // 30px
                fontWeight='400'
                fontStyle='normal'
                color='white'
                mx={'1.5rem'}
              >
                {item.text}
              </Text>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}


export default function RnDTaxCreditsPage() {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

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


    return (
    // Set height to 100vh and use flex column layout
    <Box
      minH={{base: '100vh', md: "100vh"}} // Exact viewport height
      h={{lg: '100vh'}}
      display="flex"
      flexDirection="column"
      bgImage={{base: 'none', lg: `url('${backgroundImageUrl}')`}}
      bg={{base:'#000819'}}
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
    >

      <Head>
        <title>Research and Development Tax Credits | Ashton & Carrington</title>
        <meta name="description" content="Empowering Innovation and Financial Growth Through Expertise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Keep Navbar above overlay */}
      <Box 
      // position="relative"
        position="sticky"
        top={0}
        // bg={'red'}
      zIndex={3}
      >
        <Navbar />
      </Box>

      {/* Container fills space, contains children, uses flex column */}
      <Box
        px={{base: '1rem', lg: '4rem'}}
        py='2rem'
        position={{base: 'relative', lg: "relative"}}
        zIndex={2} /* Content above overlay */
        flex="1" /* Grow vertically */
        overflow={{base: 'none', lg: "hidden"}} /* Prevent container scroll */
        display="flex" /* Use flex for children */
        flexDirection="column" /* Stack title and flex row */
      >

        <Box
          position="sticky"
          top={'6rem'}
          bg={'#000819'}
          // bgGradient={{base: "to-b", lg: 'none'}}
          // gradientFrom={{base:'#000819', lg: 'none'}}
          // gradientTo={{base: 'blackAlpha.900', lg: 'none'}}
          // style={{
          //   '-webkit-mask-image': 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)), linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          //   '-webkit-mask-size': '100% 50%',
          //   '-webkit-mask-repeat': 'no-repeat',
          //   '-webkit-mask-position': 'top bottom, top bottom',
          // }}
        >
          <Text
              fontFamily='Poppins'
              fontSize='2.25rem' // 36px
              lineHeight='3rem' // 48px
              fontWeight='500'
              fontStyle='normal'
              letterSpacing='0.72px'
              color='white'
              // mb={8}
              p={4}
              // position='fixed'
            >
              Research and Development Tax Credits
            </Text>
          </Box>


        {/* Flex row fills remaining space in container */}
        <Flex direction={['column', 'column', 'row']} gap={10} flex="1" overflow="hidden">
          {/* Left Sidebar */}
          <Box
            as="nav" // Use nav for semantic sidebar
            // w={['full', 'full', '250px']} // Full width on small screens, fixed width on larger
            w={['full', 'full', '18.5rem']} // Full width on small screens, fixed width on larger
            display={{base: 'none', lg: 'flex'}}
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
            {/* Use the new VerticalStepperNav component */}
            <VerticalStepperNav
              sections={sections}
              activeSection={activeSection}
              onLinkClick={handleLinkClick} // Pass the existing handler
            />
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
            // mt={{base:'10rem', lg: 0 }}
            sx={{
              '&::-webkit-scrollbar': {
                display: 'none', // Safari and Chrome
              },
              'scrollbarWidth': 'none', // Firefox
              '-ms-overflow-style': 'none', // IE and Edge
            }}
          >
            <Text
              fontFamily='Poppins'
              fontSize='1.75rem' // 28px
              fontWeight='500'
              lineHeight='normal' 
              letterSpacing='2.24px'
              color='white'
              textTransform='uppercase'
              mb='3.75rem' //60px
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
                  mb='3.75rem' //60px // Keep margin between sections
              >
                <Heading size="xl" mb={4} color="white" fontFamily='Poppins'>
                  {section.title}
                </Heading>

                <AccordionComponent />

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
      </Box>

      {/* Keep Footer above overlay */}
      <Box position="relative" zIndex={2}>
        <Footer />
      </Box>
      </Box>
  );
}