import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useBreakpointValue,
  Stack,
  Drawer,
  VStack,
  Image,
  Dialog,
  Text,
  Portal,
  Fieldset,
  Field,
  For,
  Input,
  NativeSelect,


  
} from '@chakra-ui/react';
import { Menu, X } from 'lucide-react'; // Import the hamburger and close icons
import { useState } from 'react';
import { Toaster, toaster } from "@/components/ui/toaster"
import Form from '@/components/Form'



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
                {/* <SignUpForm /> */}
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

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Use 'lg' breakpoint to switch between desktop and mobile nav
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  console.log('isDesktop', isDesktop)

  const navItems = [
    { label: 'Home', href: '/'},
    { label: 'R&D Tax Credits', href: '/research-and-development-tax-credits' },
    { label: 'Capital Allowance', href: '/capital-allowance' },
    { label: 'Accounts & Filling', href: '/accounts-filing' },
  ];



  return (
    <Box 
    px={{base: '2rem', lg: '5.5rem'}} 
    py={{base: '2rem', lg: '1rem'}} 
    position="sticky" 
    top={0} 
    zIndex="sticky"
    bgGradient="to-b"
    gradientFrom='#000819'
    gradientTo='blackAlpha.100'
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
          position="sticky" 
          top={0} 
          zIndex="sticky"
          bgGradient="to-b"
          gradientFrom='#000819'
          gradientTo='blackAlpha.100'
      >
      <Flex display={{base: 'flex', lg: 'none'}}


      >
        <Drawer.Root isOpen={isOpen} onClose={onClose} 
        placement="left" 
        size="full">
          <Drawer.Trigger asChild>
            <Menu color='#00C6CB' size={'2.75rem'} 
            mr={-10}
            />
          </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content bg='#1A2130' color="#00DEE3"> {/* Styles moved here */}
                  <Drawer.CloseTrigger > {/* Use asChild to wrap the IconButton */}
                    
                    <Box m={6}>
                      <X 
                      color="#00E2E5"
                      size={'2.75rem'}
                      
                       />
                       </Box>


                  </Drawer.CloseTrigger>
                  <Drawer.Body>
                    <VStack spacing={12} align="stretch" pt={'6rem'}>
                      {navItems.map((item) => (
                        <NavLink key={item.label} href={item.href}>
                          <Text
                            fontSize={"1.75rem"}
                            fontFamily="Poppins"
                            fontStyle='normal'
                            fontWeight={500}
                            color="#00E2E5"
                            lineHeight={'normal'}
                            letterSpacing="0.14rem" //2.24px
                            textTransform={'uppercase'}
                            mb={4}
                          >
                            {item.label}
                          </Text>
                          </NavLink>
                      ))}
                      <Button
                        mt={2}
                        px={'0.625rem'}
                        py={'1.25rem'}
                        variant={'outline'}
                        bgColor={'#000819'}
                        borderColor={'#00DEE3'}
                        borderWidth={'2px'}
                        borderRadius={'2px'}
                        _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
                        fontFamily="Poppins"
                        fontWeight={500}
                        w="full"
                      >
                          <Text
                            fontSize={"1.75rem"}
                            fontFamily="Poppins"
                            fontStyle='normal'
                            fontWeight={500}
                            color="#00E2E5"
                            lineHeight={'normal'}
                            letterSpacing="0.14rem" //2.24px
                            textTransform={'uppercase'}
                          >
                        Get in Touch
                        </Text>
                      </Button>
                    </VStack>
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
        </Drawer.Root>

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