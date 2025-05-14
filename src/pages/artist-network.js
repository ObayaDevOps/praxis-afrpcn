// pages/artist-network.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'; // For client-side only components
import {
  Box,
  Dialog, // Changed: Modal and its parts removed, Dialog added
  Button,
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  useDisclosure,
  ChakraProvider,
//   extendTheme,
  IconButton // Added for Dialog.CloseTrigger to replicate ModalCloseButton
} from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons'; // Added for IconButton icon
import { X } from 'lucide-react'
import { artists, connections } from '../data/artists';

// Dynamically import P5SketchComponent to ensure it's client-side only
const P5SketchComponentWithNoSSR = dynamic(
  () => import('../components/P5Sketch'),
  { ssr: false }
);

// Basic theme for Chakra UI
// const theme = extendTheme({
//   styles: {
//     global: {
//       body: {
//         bg: "gray.900", // Dark background for the page
//         color: "white",
//       },
//     },
//   },
// });


export default function ArtistNetworkPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedArtist, setSelectedArtist] = useState(null);
  const p5SketchApiRef = useRef(null); // To hold API functions from p5 sketch

  const handleNodeClick = (artistData) => {
    setSelectedArtist(artistData);
    onOpen();
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (p5SketchApiRef.current && typeof p5SketchApiRef.current.updateRotation === 'function') {
        // Using event.deltaY for vertical scroll. Adjust sensitivity as needed.
        p5SketchApiRef.current.updateRotation(event.deltaY);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: true }); // Use passive for better performance

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <Box>
    {/* <ChakraProvider theme={theme}> */}
      <Head>
        <title>Artist Network Graph</title>
        <meta name="description" content="Interactive artist network graph" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" py={8} bg="gray.800">
        <Heading as="h1" size="xl" mb={8} color="teal.300">
          Interactive Artist Network
        </Heading>
        
        <Text mb={4} color="gray.400">Scroll to rotate the network. Click on a node to see details.</Text>

        <Box 
          width={["95%", "90%", "80%"]} // Responsive width
          height="70vh" // Fixed height for the canvas container
          border="1px solid"
          borderColor="gray.700"
          borderRadius="md"
          overflow="hidden" // Important if canvas is larger than box
        >
          <P5SketchComponentWithNoSSR
            artists={artists}
            connections={connections}
            onNodeClick={handleNodeClick}
            onSketchReady={(api) => { p5SketchApiRef.current = api; }}
          />
        </Box>

        {selectedArtist && (
          // Using Dialog component based on the provided example structure
          <Dialog.Root 
            open={isOpen} 
            onOpenChange={(details) => {
              // Sync with useDisclosure state.
              // Assumes 'details' is an object { open: boolean } as common in Zag.js based components
              // or a boolean as a fallback.
              let newOpenState;
              if (typeof details === 'object' && details !== null && typeof details.open === 'boolean') {
                newOpenState = details.open;
              } else if (typeof details === 'boolean') { // Fallback for simpler onOpenChange signatures
                newOpenState = details;
              } else {
                // If details is undefined or an unexpected type, do not proceed.
                console.warn("Dialog onOpenChange received unexpected details:", details);
                return;
              }
              
              if (newOpenState) {
                onOpen();
              } else {
                onClose();
              }
            }}
          >
            <Dialog.Backdrop /> {/* Corresponds to ModalOverlay */}
            <Dialog.Positioner> {/* Helps with positioning Dialog.Content */}
              <Dialog.Content 
                size="xl" // Prop from original Modal, affects width/maxHeight.
                                // Assumes Dialog.Content supports 'size' or similar.
                bg="gray.700" // Styling from original ModalContent
                color="white"   // Styling from original ModalContent
              >
                <Dialog.Header 
                  borderBottomWidth="1px" // Styling from original ModalHeader
                  borderColor="gray.600"   // Styling from original ModalHeader
                >
                  <Dialog.Title>{selectedArtist.name}</Dialog.Title> {/* Content for the header */}
                </Dialog.Header>
                
                {/* 
                  Replicating ModalCloseButton functionality and appearance.
                  Placed as a direct child of Dialog.Content, positioned absolutely.
                  This uses Dialog.CloseTrigger with `asChild` to pass functionality to a styled IconButton.
                */}
                <Dialog.CloseTrigger asChild>
                  {/* <IconButton
                    aria-label="Close dialog"
                    icon={<X />}
                    variant="ghost" // Common styling for close buttons
                    color="currentColor" // Inherits color, usually white from Dialog.Content
                    position="absolute"
                    top="8px" // Typical offset for ModalCloseButton
                    right="12px" // Typical offset for ModalCloseButton
                    size="md" // A standard IconButton size
                  /> */}
                </Dialog.CloseTrigger>

                <Dialog.Body 
                  py={6} // Styling from original ModalBody
                  // For scrollBehavior="inside" equivalent:
                  // Assumes Dialog.Content with 'size' prop constrains its maxHeight,
                  // and Dialog.Body will scroll if content overflows.
                  overflowY="auto" 
                >
                  <VStack spacing={4} align="start">
                    <Text><strong>Born:</strong> {selectedArtist.born}</Text>
                    <Text><strong>Died:</strong> {selectedArtist.died}</Text>
                    <Text><strong>Nationality:</strong> {selectedArtist.nationality}</Text>
                    <Text><strong>Bio:</strong> {selectedArtist.info}</Text>
                    {selectedArtist.notableWorks && selectedArtist.notableWorks.length > 0 && (
                      <Box>
                        <Text fontWeight="bold">Notable Works:</Text>
                        <List styleType="disc" pl={5}>
                          {selectedArtist.notableWorks.map((work, index) => (
                            <ListItem key={index}>{work}</ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </VStack>
                </Dialog.Body>

                <Dialog.Footer 
                  borderTopWidth="1px" // Styling from original ModalFooter
                  borderColor="gray.600"  // Styling from original ModalFooter
                >
                  {/* Retains the original Button for closing, using the onClose from useDisclosure */}
                  <Button colorScheme="teal" onClick={onClose}>
                    Close
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        )}
      </Box>
    {/* </ChakraProvider> */}
    </Box>
  );
}