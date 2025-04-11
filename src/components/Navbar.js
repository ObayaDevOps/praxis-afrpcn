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
  Image, // Using Image for the logo based on index.js
} from '@chakra-ui/react';
import { Menu, X } from 'lucide-react'; // Import the hamburger and close icons

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
    <Box px={'5.5rem'} py={'1rem'} position="sticky" top={0} zIndex="sticky">
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


            {/* Desktop Get in Touch Button */}
            <Button
              variant={'outline'}
              color={'#00DEE3'}
              borderColor={'#00DEE3'}
              _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
              fontFamily="Poppins"
              fontWeight={500}
              fontSize='0.875rem'
              lineHeight='1.25rem'
              px='1rem'
              py='0.625rem'
              justify-content='center'
              align-items='center'
              rounded='xs'
            >
              Get in Touch
            </Button>
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