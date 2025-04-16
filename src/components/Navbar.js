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



// const SignUpForm = () => {
//   return (
//     <Fieldset.Root size="md" maxW="md"
//     >
//       <Stack>
//         {/* <Fieldset.Legend>Contact details</Fieldset.Legend> */}
//         {/* <Fieldset.HelperText>
//           Please provide your contact details below.
//         </Fieldset.HelperText> */}
//       </Stack>

//       <Fieldset.Content>
//         <Field.Root>
//           <Field.Label>
//           <Text               
//             fontFamily='Poppins'
//             fontSize='0.75rem' // 30px
//             lineHeight='normal' // 30px
//             fontWeight='400'
//             fontStyle='normal'
//             color='#CCCED1'
//           >            
//             Name
//           </Text>
//             </Field.Label>
//           <Input name="name" 
//             placeholder='John Appleseed' 
//             fontFamily='Poppins' 
//             fontSize={'0.875rem'}
//             color='white'
//            />
//         </Field.Root>

//         <Field.Root>
//           <Field.Label>
//           <Text               
//             fontFamily='Poppins'
//             fontSize='0.75rem' // 30px
//             lineHeight='normal' // 30px
//             fontWeight='400'
//             fontStyle='normal'
//             color='#CCCED1'
//           >            
//             Email
//           </Text>

//           </Field.Label>
//           <Input name="email"  color='white' type="email" placeholder='john.appleseed@ac.co.uk' fontFamily='Poppins' fontSize={'0.875rem'} />
//         </Field.Root>

//         <Field.Root>
//           <Field.Label>
//           <Text               
//             fontFamily='Poppins'
//             fontSize='0.75rem' // 30px
//             lineHeight='normal' // 30px
//             fontWeight='400'
//             fontStyle='normal'
//             color='#CCCED1'
//           >            
//             Phone Number
//           </Text>

//           </Field.Label>
//           <Input name="phoneNumber"  color='white' placeholder='447123456789' fontFamily='Poppins' fontSize={'0.875rem'} />
//         </Field.Root>

//         <Field.Root>
//           <Field.Label>
//           <Text               
//             fontFamily='Poppins'
//             fontSize='0.75rem' // 30px
//             lineHeight='normal' // 30px
//             fontWeight='400'
//             fontStyle='normal'
//             color='#CCCED1'
//           >            
//             Message
//           </Text>

//           </Field.Label>
//           <Input 
//           name="message" 
//           placeholder='Leave your message here...' 
//           ontFamily='Poppins' 
//           fontSize={'0.875rem'}
//           color='white'
//           />
//         </Field.Root>

//       </Fieldset.Content>

//       <Button type="submit" 
//         variant={'outline'}
//         bgColor={'#00DEE3'}
//         borderColor={'#00DEE3'}
//         _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
//         fontFamily="Poppins"
//         fontWeight={500}
//       >
//         Submit
//       </Button>
//     </Fieldset.Root>
//   )
// }

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
    { label: 'R&D Tax Credits', href: '/research-and-development-tax-credits' },
    { label: 'Capital Allowance', href: '/capital-allowance' },
    { label: 'Accounts & Filling', href: '/accounts-filing' },
  ];



  return (
    <Box 
    px={'5.5rem'} 
    py={'1rem'} 
    position="sticky" 
    top={0} 
    zIndex="sticky"
    bgGradient="to-b"
    gradientFrom='#000819'
    gradientTo='blackAlpha.100'
    
    
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="container.xl" mx="auto">

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

        {isDesktop ? (
          <>
            {/* Desktop Navigation Links */}
            <HStack spacing={'1.5rem'} alignItems={'left'}>
              <HStack as={'nav'} spacing={'1.5rem'}>
                {navItems.map((item) => (
                  <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
                ))}
              </HStack>

              <ContactModal />

            </HStack>
          </>
        ) : (
          <>
            {/* Spacer to push IconButton to the right */}
             <Box flex={1} />
            {/* Mobile Navigation - Hamburger Icon */}
            <IconButton
              size={'md'}
              icon={<Menu color="#00DEE3"/>} // Cyan color
              aria-label={'Open Menu'}
              display={{ lg: 'none' }}
              onClick={onOpen}
              variant="ghost"
             _hover={{ bg: 'rgba(0, 222, 227, 0.1)' }}
            />
          </>
        )}
      </Flex>

      {/* Mobile Drawer */}
      {!isDesktop && (
        <Drawer.Root isOpen={isOpen} onClose={onClose} placement="left" size="full">
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="#000819" color="#00DEE3"> {/* Styles moved here */}
              <Drawer.CloseTrigger asChild> {/* Use asChild to wrap the IconButton */}
                 <IconButton
                    aria-label="Close menu"
                    icon={<X color="#00DEE3" />}
                    // onClick is handled by Drawer.CloseTrigger
                    variant="ghost"
                    size="lg" // Adjust size as needed
                    position="absolute" // Keep positioning
                    right="8px"
                    top="8px"
                    _hover={{ bg: 'rgba(0, 222, 227, 0.1)' }} // Consistent hover effect
                  />
              </Drawer.CloseTrigger>
              <Drawer.Header borderBottomWidth="1px" borderColor="rgba(0, 222, 227, 0.2)">
                <Drawer.Title>Navigation</Drawer.Title> {/* Title added */}
              </Drawer.Header>
              <Drawer.Body>
                <VStack spacing={6} align="stretch" pt={5}>
                  {navItems.map((item) => (
                    <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
                  ))}
                  <Button
                    mt={4}
                    variant={'outline'}
                    color={'#00DEE3'}
                    borderColor={'#00DEE3'}
                    _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
                    fontFamily="Poppins"
                    fontWeight={500}
                    w="full"
                  >
                    Get in Touch
                  </Button>
                </VStack>
              </Drawer.Body>
              <Drawer.Footer /> {/* Added empty footer as per structure */}
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      )}
    </Box>
  );
} 