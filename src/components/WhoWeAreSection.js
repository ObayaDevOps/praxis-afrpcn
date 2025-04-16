import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
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
    <VStack align="start" p={6}>
      {/* <Flex align="center" gap={3}> */}
        {/* <Icon as={icon} boxSize={8} color={iconColor} strokeWidth={1.5} /> */}
      <HStack>
        <Flex align="center" p={0}>
          <Image
                  src={imageLink}
                  alt="Ashton & Carrington Logo"
                  height={'60px'} // Adjust height as needed
                  width={'60px'} // Maintain aspect ratio
                  mr={16}
          />
        </Flex>

        <Box pl={2}>
          <Heading 
            fontSize="1.75rem" 
            fontFamily="Poppins"
            fontStyle={'normal'} 
            fontWeight={500} 
            lineHeight="normal"
            letterSpacing={'0.14rem'}
          >
            {title}
          </Heading>
          <Text 
              fontSize="1rem" 
              fontFamily="Poppins"
              fontStyle={'normal'} 
              fontWeight={400} 
              lineHeight="1.875rem"


            // color="gray.300" 
            // fontSize="sm" 
            // pl={{ base: 0, md: 11 }} 
            // fontFamily="Poppins"
          >
            {children}
          </Text>
        </Box>
      </HStack>
            {/* </Flex> */}

    </VStack>
  );
};

const WhoWeAreSection = () => {
  const bgColor = '#000819'; // Match index.js background
  const textColor =  'white';
  const tabletBgGradient = 'linear(to-b,  rgba(0, 8, 25, 0.40), rgba(0, 8, 25, 0.80))'; // Approximate gradient


  return (
    <Box bg={bgColor} py={{base: 20, md: 16}} px={2} color={textColor}>
      <Container maxW="container.xl">
        <Heading
        fontSize={"1.75rem"}
        fontFamily="Poppins"
        fontStyle='normal'
        fontWeight={500}
        color="white"
        lineHeight={'normal'}
        letterSpacing="0.14rem" //2.24px
        textAlign={{ base: 'center', md: 'left' }}
        pb={{base: '2rem', md:  '1.5rem'}}
        >
          Who We Are
        </Heading>

        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 10, lg: 24 }}
          align="stretch" // Make columns equal height potentially
        >
          {/* Left Panel - Tablet */}
          <Box
            flex={1}
            // bgGradient={tabletBgGradient}
            borderRadius='0.75rem' // Rounded corners like a tablet
            p={{ base: '2.5rem', md: '2rem' }}
            // boxShadow="lg" // Add subtle shadow if desired
            boxShadow={`0px 0px 20px 3px rgba(0,4,14,1)`}

            display="flex"
            flexDirection="column"

            bgGradient="to-r"
            gradientFrom='#00DEE3'
            gradientTo='#5700C4'
          >
             <NextImage
                src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744280597/IFA_Logo_eag4em.svg'} // Replace with actual IFA logo URL if available
                alt="IFA Logo"
                // width={180} // Adjust size as needed
                // height={70} // Adjust size as needed

                width={218} // Adjust size as needed
                height={131.678} // Adjust size as needed

                style={{ marginBottom: '20px' }} // Add space below logo
              />
             <Heading 
              fontSize={'1.25rem'}
              mb={2} 
              fontFamily="Poppins"
              fontWeight={500}
              lineHeight={'normal'}
              letterSpacing={'0.025rem'}              
              >
              IFA Accredited
             </Heading>
             <Text 
              fontSize={'1rem'}
              fontFamily="Poppins"
              fontWeight={400}
              lineHeight={'1.875rem'}
              letterSpacing={'0.025rem'}  
              mb={6} 
            >
              We are proud to be IFA accredited in 2025.
             </Text>
             <Text 
              fontSize={'1rem'}
              fontFamily="Poppins"
              fontWeight={400}
              lineHeight={'1.875rem'}
              letterSpacing={'0.025rem'}  
             >
                The Institute of Financial Accountants (IFA) is an internationally recognised professional accountancy membership body providing dedicated support to SMEs and SMPs.
             </Text>
             <Spacer /> {/* Pushes content up if needed */}
          </Box>

          {/* Right Panel - Features */}
          <Box flex={2}> {/* Give more space to the features */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={20} spacingY={16}>
              <FeatureCard imageLink={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279793/Personable_j0oqxz.svg'} icon={UsersRound} title="PERSONABLE">
                Delivering a friendly, tailored approach that puts clients at the heart of everything.
              </FeatureCard>
              <FeatureCard imageLink={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744279793/Committed_tncrxa.svg'} icon={Target} title="COMMITTED">
                Dedicated to unlocking tax savings and driving sustainable growth for businesses of all sizes.
              </FeatureCard>
              <FeatureCard  imageLink={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744725228/Reliable_tkbbqu.svg'} icon={ShieldCheck} title="TRUSTED">
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