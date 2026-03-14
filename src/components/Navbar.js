import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useDisclosure,
  useBreakpointValue,
  VStack,
  Image,
  Dialog,
  Text,
  Portal,
} from '@chakra-ui/react';
import { useState } from 'react';
import MobileDrawer from './MobileDrawer'; // Import the new component

const NavLink = ({ children, href }) => (
  <Link
    px={3}
    py={1}
    rounded={'md'}
    color={'white'} // Cyan color from image
    _hover={{
      textDecoration: 'none',
      // Add a subtle hover effect if desired
      // bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
    fontFamily="Space Mono" // Assuming Poppins based on index.js heading
    fontWeight={500} // Match heading weight
  >
    {children}
  </Link>
);

export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Use 'lg' breakpoint to switch between desktop and mobile nav
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const navItems = [
    { label: 'Home', href: '/'},
    { label: 'About', href: '/' },
    { label: 'Socials', href: '/' },
    { label: 'Calendar', href: '/' },
  ];

  return (
    <Box 
    px={{base: '2rem', lg: '5.5rem'}} 
    py={{base: '1rem', lg: '1rem'}} 
    position="sticky" 
    top={0} 
    zIndex="sticky"
    // bg={props.bg}
    // bg={'red'}
    // borderBottom={'1px solid white'}
    // bgGradient={{base:"to-b", lg: 'none'}}
    // gradientFrom={{base: props.bg ,lg: 'none'}}
    // gradientTo={{base:'transparent', lg: 'none'}}
    >
      <Flex 
      h={16} 
      alignItems={'center'} 
      justifyContent={'space-between'} 
      maxW="container.xl" 
      mx="auto"
      display={{base: 'none', lg: 'flex'}}
      border='1px'

      >
        {/* Logo - Using Image component like in index.js */}
        <Link href="/" _hover={{ textDecoration: 'none' }}>
             <Image
             mt={20}
             
                src={'https://cdn.sanity.io/images/6c1aac3a/production/fd9f2fc191932aa0bc59b820ad99931a1fdcc37f-500x500.svg'}
                alt="AFRPCN Afropocene Logo"
                height={'100px'} // Adjust height as needed
                width={'auto'} // Maintain aspect ratio
                // ml={'64px'}
             />
        </Link>

        {/* <Link href="/" _hover={{ textDecoration: 'none' }}>
             <Text
             pt={12}
             color='white'
             fontFamily='Space Mono'
             fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}
             textDecoration='underline'>
              Back
             </Text>
        </Link> */}

        {/* <Box mt={20}>
        <Link href="https://www.afropocene.com/" _hover={{ textDecoration: 'none' }}>

             <Text
             color=" #ffffff"
             fontFamily={"Space Mono"}
             fontSize ={"1rem"}
             fontWeight={500}
             >
             Back to main site
             </Text>

        </Link>
        </Box> */}


          {/* <Flex display={{base: 'none', lg: 'flex'}}>
            Desktop Navigation Links
            <HStack spacing={'1.5rem'} alignItems={'center'}>
              <HStack as={'nav'} spacing={'1.5rem'}>
                {navItems.map((item) => (
                  <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
                ))}
              </HStack>


            </HStack>
          </Flex> */}

      </Flex>

      {/* Mobile Drawer */}
      <Box>
      <Flex display={{base: 'flex', lg: 'none'}} alignItems="center" justifyContent="flex-start">

        <Box pl={0} >
          <Link href="/" _hover={{ textDecoration: 'none' }}>
                <Image
                mt={2}
                    src={'https://cdn.sanity.io/images/6c1aac3a/production/fd9f2fc191932aa0bc59b820ad99931a1fdcc37f-500x500.svg'}
                    alt="AFRPCN Afropocene Logo"
                    height={'70px'} // Adjust height as needed
                    width={'auto'} // Maintain aspect ratio
                    // ml={'64px'}
                />
            </Link>
          </Box>

      </Flex>
      </Box>
    </Box>
  );
} 