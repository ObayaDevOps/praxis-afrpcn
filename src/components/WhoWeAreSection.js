import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  Spacer,
  Image
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { UsersRound, Target, ShieldCheck, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon, title, imageLink, children }) => {
  // Using a teal color similar to the image gradients for icons
  const iconColor = 'teal.300';

  return (
    <VStack align="start" spacing={3}>
      <Flex align="center" gap={3}>
        {/* <Icon as={icon} boxSize={8} color={iconColor} strokeWidth={1.5} /> */}
        <Image
                src={imageLink}
                alt="Ashton & Carrington Logo"
                height={'40px'} // Adjust height as needed
                width={'auto'} // Maintain aspect ratio
             />
        <Heading as="h3" size="md" fontWeight="bold" color="white" fontFamily="Poppins">
          {title}
        </Heading>
      </Flex>
      <Text color="gray.300" fontSize="sm" pl={{ base: 0, md: 11 }} fontFamily="Poppins">
        {children}
      </Text>
    </VStack>
  );
};

const WhoWeAreSection = () => {
  const bgColor = '#000819'; // Match index.js background
  const textColor =  'white';
  const tabletBgGradient = 'linear(to-br, teal.600, purple.700)'; // Approximate gradient

  return (
    <Box bg={bgColor} py={16} color={textColor}>
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="lg"
          fontWeight="bold"
          mb={10}
          textTransform="uppercase"
          letterSpacing="wider"
          fontFamily="Poppins"
        >
          Who We Are
        </Heading>

        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 10, lg: 16 }}
          align="stretch" // Make columns equal height potentially
        >
          {/* Left Panel - Tablet */}
          <Box
            flex={1}
            bgGradient={tabletBgGradient}
            borderRadius="2xl" // Rounded corners like a tablet
            p={{ base: 6, md: 8 }}
            boxShadow="lg" // Add subtle shadow if desired
            display="flex"
            flexDirection="column"
          >
             <NextImage
                src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744280597/IFA_Logo_eag4em.svg'} // Replace with actual IFA logo URL if available
                alt="IFA Logo"
                width={180} // Adjust size as needed
                height={70} // Adjust size as needed
                style={{ marginBottom: '20px' }} // Add space below logo
              />
             <Heading as="h4" size="md" mb={2} fontFamily="Poppins">
              IFA Accredited
             </Heading>
             <Text fontSize="md" mb={6} fontFamily="Poppins">
              We are proud to be IFA accredited in 2025.
             </Text>
             <Text fontSize="sm" color="gray.200" fontFamily="Poppins">
                The Institute of Financial Accountants (IFA) is an internationally recognised professional accountancy membership body providing dedicated support to SMEs and SMPs.
             </Text>
             <Spacer /> {/* Pushes content up if needed */}
          </Box>

          {/* Right Panel - Features */}
          <Box flex={1.5}> {/* Give more space to the features */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={10} spacingY={10}>
              <FeatureCard imageLink={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279793/Personable_j0oqxz.svg'} icon={UsersRound} title="PERSONABLE">
                Delivering a friendly, tailored approach that puts clients at the heart of everything.
              </FeatureCard>
              <FeatureCard imageLink={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279793/Committed_tncrxa.svg'} icon={Target} title="COMMITTED">
                Dedicated to unlocking tax savings and driving sustainable growth for businesses of all sizes.
              </FeatureCard>
              <FeatureCard  imageLink={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279793/Reliable_jusezx.svg'} icon={ShieldCheck} title="TRUSTED">
                Our chartered status and track record of excellence mean we deliver precise and transparent tax solutions.
              </FeatureCard>
              <FeatureCard  imageLink={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279793/Innovative_sfelwb.svg'} icon={Sparkles} title="INNOVATIVE">
                By adopting a forward-thinking mindset, clients are ensured to stay ahead in an ever-evolving landscape.
              </FeatureCard>
            </SimpleGrid>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default WhoWeAreSection; 