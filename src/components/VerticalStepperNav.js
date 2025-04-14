import {
    Box,
    Flex,
    Link as ChakraLink,
} from '@chakra-ui/react';

// Reusable Vertical Stepper Navigation Component
const VerticalStepperNav = ({ sections, activeSection, onLinkClick }) => {
    return (
        <Box as="nav" position="relative">
            {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                const isLastItem = index === sections.length - 1;

                return (
                    <Flex key={section.id} align="flex-start" minH="40px" position="relative">
                        {/* Line Connector */}
                        {!isLastItem && (
                            <Box
                                position="absolute"
                                left="11px" // Centered based on 24px dot container
                                top="20px" // Start line below the center of the dot
                                bottom="0"
                                width="2px"
                                bg={"gray.600"} // Keep line consistently grey or conditionally color? Let's keep it grey.
                                zIndex={0}
                                // Removed transition from line - potentially distracting
                            />
                        )}

                        {/* Dot Container - Centering content */}
                        <Box
                            minW="24px" // Container size for ring + glow
                            h="24px"
                            position="relative" // For positioning ring and glow
                            zIndex={1}
                            mr={4} // Space between dot and text
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            // Apply glow to the container when active
                            boxShadow={isActive ? `0px 0px 15px 4px rgba(45,255,196,0.9)` : 'none'}
                            // boxShadow={isActive ? `0 0 8px 2px teal.200` : 'none'}

                            borderRadius="full" // To make glow circular
                            transition="box-shadow 0.2s ease-in-out"
                        >
                            {/* Outer Ring (Conditional) */}
                            {isActive && (
                                <Box
                                    position="absolute"
                                    top="2px" // Center 20px ring in 24px container
                                    left="2px"
                                    w="20px" // Size of the ring
                                    h="20px"
                                    border="2px solid"
                                    borderColor="#D2FAFB" // Color of the ring
                                    borderRadius="full"
                                    zIndex={0} // Behind inner dot rgb(210, 250, 251) = #D2FAFB
                                    sx={{
                                        '-webkit-box-shadow': '0px 0px 183px 45px rgba(210, 250, 251,0.9)',
                                        '-moz-box-shadow':  '0px 0px 183px 45px rgba(210, 250, 251,0.9)',
                                        'box-shadow':  '0px 0px 183px 45px rgba(210, 250, 251,0.9)'
                                    }}
                                />
                            )}
                            {/* Inner Dot */}
                            <Box
                                w={isActive ? "12px" : "10px"} // Inner dot size
                                h={isActive ? "12px" : "10px"}
                                bg={isActive ? "teal.300" : "gray.500"} // Inner dot color
                                

                                borderRadius="full"
                                position="relative" // Ensure stacking context
                                zIndex={1} // Above the ring
                                transition="all 0.2s ease-in-out"
                            />
                        </Box>

                        {/* Link */}
                        <ChakraLink
                            href="#" // Use # and rely on onClick handler
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default hash jump
                                onLinkClick(section.id); // Call the passed handler
                            }}
                            color={isActive ? "#D2FAFB" : "gray.400"} // Active teal, inactive grey text
                            fontWeight={isActive ? "semibold" : "500"}
                            _hover={{
                                color: 'teal.200', // Lighter teal on hover
                            }}
                            fontFamily="Poppins"
                            fontSize="1rem" // Adjust font size as needed
                            // fontWeight='500'
                            lineHeight='1.875rem' //"24px" // Match dot container height
                            // pt="1px" // Removed fine-tuning, lineHeight should handle it
                            transition="color 0.2s ease-in-out"
                        >
                            {section.title}
                        </ChakraLink>
                    </Flex>
                );
            })}
        </Box>
    );
};

export default VerticalStepperNav; 