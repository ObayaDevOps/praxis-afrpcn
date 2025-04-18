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
import Form from '@/components/Form'
import MobileDrawer from './MobileDrawer'; // Import the new component



const ContactModal = () => {
  return (
    <Dialog.Root placement={'center'} >
      <Dialog.Trigger asChild>
        <Button
        variant={'outline'}
        color={'#00DEE3'}
        borderColor={'#00E2E5'}
        _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
        fontFamily="Poppins"        
        fontWeight={500}
        >          
          Get in Touch
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop  />
        <Dialog.Positioner >
          <Dialog.Content 
            bg='#000819'
            borderWidth={'2px'}
            borderRadiud={'12px'}
            borderColor='#00E2E5'
            p={'0.5rem'}
          >
            <Dialog.Header>
              <Dialog.Title>
                <Text
                  fontFamily='Poppins'
                  fontSize={'1.25rem'}
                  lineHeight='normal' // 30px
                  fontWeight='500'
                  letterSpacing={'0.025rem'}
                  fontStyle='normal'
                  color='white'
                >
                Contact Us
                </Text>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text
                fontFamily='Poppins'
                fontSize='0.875rem' // 30px
                lineHeight='1.875rem' // 30px
                fontWeight='400'
                fontStyle='normal'
                color='#FFF'
              >
              Want to reach out? 
              Enter your details below and provide a 
              message to Ashton & Carrington 
              and we’ll respond as soon as we can.
              </Text>

              <Box>
                <Form />
              </Box>


          
            </Dialog.Body>
            <Dialog.Footer mt={'3.5rem'}>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant={'solid'}
                  color={'#00E2E5'}
                  borderColor={'#00DEE3'}
                  _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
                  fontFamily="Poppins"
                  fontWeight={500}

                  position='absolute'
                  right={0}
                  bottom={0}
                  mb={'1.5rem'}
                  mr={'12rem'}
                >
                  Close
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const NavLink = ({ children, href }) => (
  <Link
    px={3}
    py={1}
    rounded={'md'}
    color={'#00DEE3'} // Cyan color from image
    _hover={{
      textDecoration: 'none',
      // Add a subtle hover effect if desired
      // bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
    fontFamily="Poppins" // Assuming Poppins based on index.js heading
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
    { label: 'R&D Tax Credits', href: '/research-and-development-tax-credits' },
    { label: 'Capital Allowance', href: '/capital-allowance' },
    { label: 'Accounts & Filling', href: '/accounts-filing' },
  ];



  return (
    <Box 
    px={{base: '2rem', lg: '5.5rem'}} 
    py={{base: '1rem', lg: '1rem'}} 
    position="sticky" 
    top={0} 
    zIndex="sticky"
    bg={props.bg}
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
      >
        {/* Logo - Using Image component like in index.js */}
        <Link href="/" _hover={{ textDecoration: 'none' }}>
             <Image
                src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279814/Vector_rdxjfp.svg'}
                alt="Ashton & Carrington Logo"
                height={'40px'} // Adjust height as needed
                width={'auto'} // Maintain aspect ratio
                // ml={'64px'}
             />
        </Link>


          <Flex display={{base: 'none', lg: 'flex'}}>
            {/* Desktop Navigation Links */}
            <HStack spacing={'1.5rem'} alignItems={'left'}>
              <HStack as={'nav'} spacing={'1.5rem'}>
                {navItems.map((item) => (
                  <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
                ))}
              </HStack>

              <Box ml={4}>
                <ContactModal />
              </Box>

            </HStack>
          </Flex>

      </Flex>

      {/* Mobile Drawer */}
      <Box
          // position="sticky" 
          // top={0} 
          // zIndex="sticky"
          // bgGradient="to-b"
          // gradientFrom='#000819'
          // gradientTo='blackAlpha.100'
      >
      <Flex display={{base: 'flex', lg: 'none'}} alignItems="center" justifyContent="space-between">
          <MobileDrawer
            isOpen={isOpen}
            onClose={onClose}
            navItems={navItems}
            getInTouchText="Get in Touch!"
          />



        <Box pl={4} >
          <Link href="/" _hover={{ textDecoration: 'none' }}>
                <Image
                    src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279814/Vector_rdxjfp.svg'}
                    alt="Ashton & Carrington Logo"
                    height={'40px'} // Adjust height as needed
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