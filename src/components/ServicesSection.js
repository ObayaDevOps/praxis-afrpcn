import { Box, Container, Heading, SimpleGrid, Text, VStack, Link, Icon, Flex } from '@chakra-ui/react';
import { HandCoins, Building, Files, ArrowRight, House, Folder } from 'lucide-react'; // Import required icons

const services = [
  {
    icon: HandCoins,
    title: 'R&D Tax Credits',
    description:
      'R&D (Research & Development) tax credits are government incentives designed to reward businesses investing in innovation. Ashton & Carrington helps start ups navigate and maximise these credits, providing expert and tailored solutions that unlock hidden savings and support growth.',
    imageUrl: 'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744713628/Horizontal_Graphic_oxspzu.svg',
    link: '#rd-tax-credits',
  },
  {
    icon: House,
    title: 'Capital Allowances',
    description:
      'Capital Allowances allow businesses to reduce their taxable profits by claiming tax relief on investments in assets like property, equipment, and renovations. Eligible businesses can offset these costs against their tax bill, freeing up funds for future growth. Ashton & Carrington specialises in identifying and maximising these allowances, ensuring businesses unlock their full savings potential.',
    imageUrl: 'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744713675/Horizontal_Graphic_1_hgplqw.svg', 
    link: '#capital-allowances',
  },
  {
    icon: Folder,
    title: 'Accounts & Filing',
    description:
      'Ashton & Carrington can also provide additional services such as accounts and tax filings in order to streamline the process of claiming Capital Allowances or R&D credits.',
    imageUrl: 'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744713684/Horizontal_Graphic_2_t3u7gw.svg', 
    link: '#accounts-filing',
  },
];

const ServiceCard = ({ icon, title, description, imageUrl, link }) => {
  return (
    <Box
      bgImage={`url(${imageUrl})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="xl"
      p={'2rem'}
      m={2}
      position="relative"
      overflow="hidden"
      color="white"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'linear-gradient(to bottom, rgba(0, 8, 25, 0.40), rgba(0, 8, 25, 0.80))', // Dark overlay gradient
        zIndex: 1,
      }}
      boxShadow={`0px 0px 20px 3px rgba(0,4,14,1)`}

      minH={{ base: "auto", md: "450px" }} // Ensure consistent height on larger screens
      // h={'500px'}
      // w={'460px'}


      display="flex" // Use flexbox for vertical alignment
      flexDirection="column" // Stack items vertically
      justifyContent="space-between" // Push link to bottom
    >
      <VStack spacing={4} align="start" zIndex={2} position="relative" flexGrow={1}>
        <Icon 
          as={icon} 
          // boxSize={10} 
          color="white" 
          mb={2}
          strokeWidth={'0.75px'}
          h={'72px'}
          w={'72px'}
         />
        <Heading
        //  as="h3" 
        fontSize="1.25rem" 
         fontFamily="Poppins" 
         fontWeight={500}
         fontStyle={'normal'}
         letterSpacing={'0.025rem'}
         lineHeight="normal"
          pb={2}
        >
          {title}
        </Heading>
        <Text 
          fontSize="1rem" 
          fontFamily="Poppins"
          fontStyle={'normal'} 
          fontWeight={400} 
          lineHeight="1.875rem"
        >
          {description}
        </Text>
      </VStack>
      <Link
        href={link}
        mt={6} // Add margin top to push from description
        color="#00E2E5"
        fontWeight={500}
        fontFamily="Poppins"
        lineHeight='1.25rem'
        display="inline-flex"
        alignItems="center"
        zIndex={2}
        position="relative"
        _hover={{ textDecoration: 'underline' }}
      >
        Find out more <Icon as={ArrowRight} ml={2} />
      </Link>
    </Box>
  );
};

const ServicesSection = () => {
  return (
    <Container maxW="container.xl" py={16} px={{ base: 4, md: 8 }}>
      <Heading
        fontSize="1.75rem"
        fontFamily="Poppins"
        fontStyle='normal'
        fontWeight={500}
        color="white"
        lineHeight={'normal'}
        letterSpacing="0.14rem" //2.24px
        textAlign={{ base: 'center', md: 'left' }}
        pb={'1.5rem'}
      >
        OUR SERVICES
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            link={service.link}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ServicesSection; 