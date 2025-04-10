import { Box, Container, Heading, SimpleGrid, Text, VStack, Link, Icon, Flex } from '@chakra-ui/react';
import { HandCoins, Building, Files, ArrowRight } from 'lucide-react'; // Import required icons

const services = [
  {
    icon: HandCoins,
    title: 'R&D Tax Credits',
    description:
      'R&D (Research & Development) tax credits are government incentives designed to reward businesses investing in innovation. Ashton & Carrington helps start ups navigate and maximise these credits, providing expert and tailored solutions that unlock hidden savings and support growth.',
    imageUrl: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', // Example stock image
    link: '#rd-tax-credits',
  },
  {
    icon: Building,
    title: 'Capital Allowances',
    description:
      'Capital Allowances allow businesses to reduce their taxable profits by claiming tax relief on investments in assets like property, equipment, and renovations. Eligible businesses can offset these costs against their tax bill, freeing up funds for future growth. Ashton & Carrington specialises in identifying and maximising these allowances, ensuring businesses unlock their full savings potential.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Example stock image
    link: '#capital-allowances',
  },
  {
    icon: Files,
    title: 'Accounts & Filing',
    description:
      'Ashton & Carrington can also provide additional services such as accounts and tax filings in order to streamline the process of claiming Capital Allowances or R&D credits.',
    imageUrl: 'https://images.unsplash.com/photo-1605976313109-1a03519a8cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80', // Example stock image
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
      p={8}
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
        bg: 'linear-gradient(to bottom, rgba(0, 8, 25, 0.85), rgba(0, 8, 25, 0.95))', // Dark overlay gradient
        zIndex: 1,
      }}
      boxShadow="lg"
      minH={{ base: "auto", md: "450px" }} // Ensure consistent height on larger screens
      display="flex" // Use flexbox for vertical alignment
      flexDirection="column" // Stack items vertically
      justifyContent="space-between" // Push link to bottom
    >
      <VStack spacing={4} align="start" zIndex={2} position="relative" flexGrow={1}>
        <Icon as={icon} boxSize={10} color="#00DEE3" mb={2} />
        <Heading as="h3" size="lg" fontFamily="Poppins" fontWeight={600}>
          {title}
        </Heading>
        <Text fontSize="md" fontFamily="Poppins" fontWeight={400} lineHeight="1.6">
          {description}
        </Text>
      </VStack>
      <Link
        href={link}
        mt={6} // Add margin top to push from description
        color="#00DEE3"
        fontWeight={500}
        fontFamily="Poppins"
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
        as="h2"
        size="xl"
        mb={10}
        fontFamily="Poppins"
        fontWeight={700}
        color="white"
        letterSpacing="wider"
        textAlign={{ base: 'center', md: 'left' }}
      >
        OUR SERVICES
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
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