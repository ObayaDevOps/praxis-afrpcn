import { Box, Container, Heading, SimpleGrid, Text, VStack, Link, Icon, Flex } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react'; // Keep ArrowRight for the link
import NextImage from 'next/image';
import { urlForImage } from '../../sanity/lib/image'; 

const ServiceCard = ({ 
  iconImageUrl,
  title,
  description,
  backgroundImageUrl,
  backgroundImageBlur, 
  linkText, 
  linkUrl 
}) => {
  return (
    <Box
      bgImage={backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none'}
      bgSize="cover"
      bgPosition="center"
      borderRadius="xl"
      p={{base: '1.5rem', lg: '2rem'}}
      m={2}
      mb={'2rem'}
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
        bg: 'linear-gradient(to bottom, rgba(0, 8, 25, 0.40), rgba(0, 8, 25, 0.80))',
        zIndex: 1,
      }}
      boxShadow={`0px 0px 20px 3px rgba(0,4,14,1)`}

      minH={{ base: "auto", md: "450px" }}

      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack spacing={4} align="start" zIndex={2} position="relative" flexGrow={1}>
        {iconImageUrl && (
          <NextImage
            src={iconImageUrl}
            alt={`${title} icon`}
            width={72}
            height={72}
            style={{ marginBottom: '0.5rem'}}
          />
        )}
        <Heading
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
      {linkUrl && (
        <Link
          href={linkUrl}
          my={6}
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
          {linkText || 'Find out more'} <Icon as={ArrowRight} ml={2} />
        </Link>
      )}
    </Box>
  );
};

const ServicesSection = ({ sectionData }) => {
  const { title, services } = sectionData || {};

  return (
    <Container maxW="container.xl" py={16} px={{ base: 4, md: 8 }}>
      <Heading
        fontSize="1.75rem"
        fontFamily="Poppins"
        fontStyle='normal'
        fontWeight={500}
        color="white"
        lineHeight={'normal'}
        letterSpacing="0.14rem"
        textAlign={{ base: 'center', md: 'left' }}
        pb={'1.5rem'}
      >
        {title || 'OUR SERVICES'}
      </Heading>
      {services && services.length > 0 && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              iconImageUrl={service.iconImage ? urlForImage(service.iconImage).width(72).height(72).url() : ''}
              title={service.title}
              description={service.description}
              backgroundImageUrl={service.backgroundImage ? urlForImage(service.backgroundImage).url() : ''}
              backgroundImageBlur={service.backgroundImage?.asset?.metadata?.lqip}
              linkText={service.linkText}
              linkUrl={service.linkUrl}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default ServicesSection; 