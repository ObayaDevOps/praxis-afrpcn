// https://cydstumpel.nl/

import * as THREE from 'three'
import { useRef, useState, useEffect, Suspense, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture,
  Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl, Html, Loader, useProgress
 } from '@react-three/drei'
import { easing } from 'maath'
import './rotatingGalleryUtil'
import {
  Dialog,
  Box,
  Heading,
  Text,
   ChakraProvider, Image as ChakraImage, Button, CloseButton, Portal,
  Grid, // Add Grid to imports
} from '@chakra-ui/react';
import { system } from "@chakra-ui/react/preset";
import React from 'react';
import ImageGridPhotoGallery from '../ImageGrid/imageGridPhotoGallery'
import dynamic from 'next/dynamic';
import { PortableText } from '@portabletext/react'
import  client  from '../../../sanity/lib/client';
import NextImage from 'next/image'; // Import Next.js Image component

import WavesurferPlayer from '../wavesurfer/WavesurferPlayer'




export const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [artistProfiles, setArtistProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchArtistProfiles = async () => {
      try {
        const query = `*[_type == "artistProfile"]{
          _id,
          artistTitle,
          artistSubtitle,
          about,
          "carouselImageUrl": carouselImage.asset->url,
          "carouselImageWidth": carouselImage.asset->metadata.dimensions.width, // Fetch carousel image width
          "carouselImageHeight": carouselImage.asset->metadata.dimensions.height, // Fetch carousel image height
          "voiceNoteUrl": voiceNote.asset->url,
          voiceNoteDescription,
          additionalContent,
          "galleryImages": gallery[]{
            caption,
            "src": asset->url,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          }
        }`;
        const data = await client.fetch(query);
        setArtistProfiles(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchArtistProfiles();
  }, []);


  const fov = isMobile ? 35 : 20;

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!artistProfiles.length) return <div>No artist profiles found.</div>;


  return (
  <>
  <Canvas
    camera={{ position: [0, 0, 100], fov: fov }}
    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
  >
  <Suspense fallback={<LoaderFunc />}>

    {/* <StatsGl /> */}
    <Sky />

    <fog attach="fog" args={['#FFFFFF', 8.5, 12]} />
    <ScrollControls pages={artistProfiles.length} infinite horizontal>
      <Rig rotation={[0, 0, 0.15]} artistProfiles={artistProfiles}>
        <Carousel artistProfiles={artistProfiles} />
      </Rig>
      <Banner position={[0, -0.15, 0]} />
      {/* <Preload all /> */}

    </ScrollControls>
    {/* <Environment 
    preset='dawn'
     background={false}
     backgroundBlurriness={0.5} 
     blur={1} /> */}

</Suspense>

  </Canvas>
  {/* <Loader /> */}
  </>
)};

function LoaderFunc() {
  const { active, progress, errors, item, loaded, total } = useProgress()

  return <Html center>

            <h2 style={{
              lineHeight: '1.1',
              fontWeight: '600',
              fontFamily: "'Space Mono', monospace",
              color: 'white',
              fontSize: '2.25rem',
              // width: '800px'
            }}>
              Loading Possible Futures
            </h2> 
  

  </Html>
}


function Sky() {
  const ref = useRef()
  const cloud0 = useRef()
const x = { value: 6, min: 0, max: 100, step: 1 };
const y = { value: 1, min: 0, max: 100, step: 1 };
const z = { value: 1, min: 0, max: 100, step: 1 };
const seed = { value: 1, min: 1, max: 100, step: 1 };
const segments = { value: 20, min: 1, max: 80, step: 1 };
const volume = { value: 6, min: 0, max: 100, step: 0.1 };
const opacity = { value: 0.8, min: 0, max: 1, step: 0.01 };
const fade =  { value: 10, min: 0, max: 400, step: 1 };
const growth = { value: 4, min: 0, max: 20, step: 1 };
const speed =  { value: 0.1, min: 0, max: 1, step: 0.01 };


  useFrame((state, delta) => {
    // This will cause a continuous, slow rotation around Y and X axes.
    // Adjust the `0.01` value to control the speed of rotation.
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.03;
  })
  return (
    <>
      {/* <SkyImpl /> */}
      <group ref={ref}>
        <Clouds material={THREE.MeshBasicMaterial} limit={50} >
          <Cloud concentrate="outside" growth={100} 
          // color="#FF0000" 
          opacity={0.8} 
          seed={0.8} 
          bounds={150} volume={20} 
          />
        </Clouds>
      </group>
    </>
  )
}


function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  const [cardRefs, setCardRefs] = useState([]);
  const [handleCardClick, setHandleCardClick] = useState(null);

  useFrame((state, delta) => {
    ref.current.rotation.y = scroll.offset * (Math.PI * 2) // Rotate contents in the opposite direction
    // state.events.update() // Raycasts every frame rather than on pointer-move - We will handle raycasting manually on click
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
    state.camera.lookAt(0, 0, 0) // Look at center
  })

  const onPointerDown = (e) => {
    // e.stopPropagation(); // Stop propagation if needed, but manual raycast is usually sufficient

    const intersections = e.intersections;

    const closestCardIntersection = intersections.find(intersection =>
      cardRefs.some(cardRef => cardRef.current === intersection.object)
    );

    if (closestCardIntersection && handleCardClick) {
      const clickedCardRef = cardRefs.find(cardRef => cardRef.current === closestCardIntersection.object);
      if (clickedCardRef) {
        handleCardClick(clickedCardRef);
      }
    }
  };

  return (
    <group ref={ref} {...props} onPointerDown={onPointerDown}>
      <Carousel setCardRefs={setCardRefs} setHandleCardClick={setHandleCardClick} artistProfiles={props.artistProfiles} />
    </group>
  );
}

function Carousel({ radius = 1.4, count = 8, setCardRefs, setHandleCardClick, artistProfiles }) {
  const [activeCardRef, setActiveCardRef] = useState(null);
  const cardRefs = useRef([]);
  count = artistProfiles.length; // Set count based on number of artist profiles

  const handleCardClick = useCallback((clickedCardRef) => {
    const clickedZ = clickedCardRef.current.position.z;

    if (!activeCardRef) {
      setActiveCardRef(clickedCardRef);
    } else {
      const activeZ = activeCardRef.current.position.z;

      if (clickedZ < activeZ) {
        setActiveCardRef(clickedCardRef);
      } else if (clickedCardRef === activeCardRef) {
        setActiveCardRef(null);
      }
    }
  }, [activeCardRef, setActiveCardRef]);

  const handleCloseDialog = () => {
    setActiveCardRef(null);
  };

  useEffect(() => {
    setCardRefs(cardRefs.current);
    setHandleCardClick(() => handleCardClick);
  }, [cardRefs, setCardRefs, setHandleCardClick, handleCardClick]);


  return artistProfiles.map((profile, i) => {
    const cardRef = useRef();
    cardRefs.current[i] = cardRef;

    const isDialogOpen = activeCardRef === cardRef;

    return (
      <Card
        key={profile._id} // Use unique ID from Sanity
        artistProfile={profile} // Pass the entire artist profile
        url={profile.carouselImageUrl} // Use carousel image URL from profile
        carouselImageWidth={profile.carouselImageWidth} // Pass carousel image width
        carouselImageHeight={profile.carouselImageHeight} // Pass carousel image height
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        ref={cardRef}
        isDialogOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    );
  });
}

const Card = React.forwardRef(({ url, isDialogOpen, onClose, artistProfile, carouselImageWidth, carouselImageHeight, isMobile, ...props }, ref) => {
  const [hovered, hover] = useState(false)

  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    if (ref.current && !isDialogOpen) {
      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
      easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
      easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
    } else if (ref.current) {
       easing.damp3(ref.current.scale, 1, 0.1, delta)
       easing.damp(ref.current.material, 'radius', 0.1, 0.2, delta)
       easing.damp(ref.current.material, 'zoom', 1.5, 0.2, delta)
    }
  })

  return (
    <>
      <Image
        ref={ref}
        url={url}
        transparent
        side={THREE.DoubleSide}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        {...props}
      >
        <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      </Image>

      {isDialogOpen && (
        <Html center>
          <PopUp
            imageClickedUrl={url}
            onClose={onClose}
            artistProfile={artistProfile}
            carouselImageWidth={carouselImageWidth}
            carouselImageHeight={carouselImageHeight}
            isMobile={isMobile} // Pass isMobile prop here
          />
        </Html>
      )}
    </>
  )
});


const PopUp = ({imageClickedUrl, onClose, artistProfile, carouselImageWidth, carouselImageHeight, isMobile}) => {
  const [open, setOpen] = useState(true);

  // Define custom PortableText components for paragraph spacing
  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        // Use a Chakra Text component to render paragraphs, and add bottom margin for spacing
        <Text mb={{base:10, lg: 6}}  >
          {children}
        </Text>
      ),
    },
    // You can add custom components for other block types (h1, h2, etc.) if needed
  };

  const IMAGE_WIDTH = 600;
  const imageHeight = carouselImageWidth && carouselImageHeight
    ? (carouselImageHeight / carouselImageWidth) * IMAGE_WIDTH
    : undefined;

  return (
    <ChakraProvider value={system}>
      <Box
      onWheel={(e) => e.stopPropagation()}
      // w={'100vw'}
      >
        <Dialog.Root
        // size={{base: 'sm', md: 'cover'}}
        size="cover" placement="center" motionPreset="slide-in-bottom"

        open={open} onOpenChange={(isOpen) => {
           setOpen(isOpen);
           if (!isOpen) {
            onClose();
           }
        }}>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={{base: 1, md: 6}} 
          rounded={'2xl'}
          shadow='3xl'
          maxH={{ base: '90vh', md: '90vh' }}
          // overflowY="auto"
          >
            <Dialog.Header>
              <Dialog.Title>
                <Box pt={2} ml={{base:-1, md: 0}}>
                  <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontFamily='Space Mono'
                  fontSize={{ base: '2xl', sm: '4xl', lg: '4xl' }}>
                    {artistProfile.artistTitle || 'Artist Title Not Set'}
                  </Heading>
                  <Text
                  color={'gray.600'}
                  fontWeight={300}
                  pt={{base: 1, md: 2}}
                  fontSize={{base:'sm',md:'xl'}}
                  fontFamily={'Space Mono'}
                  >   {artistProfile.artistSubtitle }
                  </Text>
                </Box>
                </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              overflowY="auto" // Allow Dialog.Body to scroll
              p={0} // Remove default padding from Dialog.Body
              display="flex" // Make Dialog.Body a flex container
              flexDirection="column" // Stack children vertically
              maxH="90vh" // Set a maximum height for the dialog body
              // height="100%" // REMOVE this line
            >
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 2fr" }} // Stacks on mobile, 1/3 and 2/3 on desktop
                gap={{ base: 4, md: 10 }} // Responsive gap between columns
                flex="1" // Grid takes all available vertical space within Dialog.Body
                p={{ base: 4, md: 8 }} // Apply padding to the grid container
                // height="100%" // REMOVE this line
              >
                {/* Left Column: Image */}
                <Box
                  display={isMobile ? "block" : "flex"} // Change to block on mobile
                  justifyContent={isMobile ? "unset" : "center"} // Remove centering on mobile
                  alignItems={isMobile ? "unset" : "center"} // Remove centering on mobile
                >
                  {imageClickedUrl && ( // Conditionally render the Next.js Image component
                    <NextImage
                      src={imageClickedUrl}
                      width={IMAGE_WIDTH}
                      height={imageHeight} // Use calculated height
                      blurDataURL={imageClickedUrl} // Use src as blurDataURL
                      placeholder="blur"
                      alt={artistProfile.artistTitle ? `${artistProfile.artistTitle} artwork` : 'Artist artwork'} // Descriptive alt text
                      style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsiveness within its container
                    />
                  )}
                </Box>

                {/* Right Column: Scrollable Content */}
                <Box
                  overflowY="auto" // This box will handle its own vertical scrolling
                  height="100%" // Take full height of its grid cell for scrolling
                >
                  <Box>
                    <Heading pt={{base: 4, md: 0}} fontFamily='Space Mono'
                    fontSize={{ base: '2xl', lg: '3xl' }}
                    lineHeight={1.1}
                    fontWeight={600}
                    >
                        About
                    </Heading>


                    <Box pt={6} pb={{base: 0, md: 4}} fontFamily='Space Mono'
                      fontSize={{base: 'md', md:'lg'}}
                    >
                      {artistProfile.about ? <PortableText value={artistProfile.about} components={portableTextComponents} /> : 'No about section provided.'}
                    </Box>
                  </Box>

                  <Box>
                    {artistProfile.voiceNoteUrl && (
                      <>
                        <Heading pt={{base: 0, md: 6}} fontFamily='Space Mono'
                        fontSize={{ base: '2xl', lg: '3xl' }}
                        lineHeight={1.1}
                        fontWeight={600}
                        >
                            Voice Note
                        </Heading>

                        <Box py={4}>
                          <WavesurferPlayer audioUrl={artistProfile.voiceNoteUrl} />
                        </Box>
                        <Text pt={0} pb={4} fontFamily='Space Mono' fontSize={{base: '0.75rem', md: '0.75rem'}}>
                          {artistProfile.voiceNoteDescription || 'No audio description provided.'}
                        </Text>
                      </>
                    )}
                  </Box>

                  <Box>
                    {artistProfile.additionalContent && artistProfile.additionalContent.length > 0 && (
                      <Box pt={6} pb={4} fontFamily='Space Mono' fontSize={{base: 'md', md:'lg'}}
>
                        <PortableText value={artistProfile.additionalContent} components={portableTextComponents} />
                      </Box>
                    )}
                  </Box>

                  <Box>
                      {artistProfile.galleryImages && artistProfile.galleryImages.length > 0 && (
                        <>
                          <Heading pt={6} fontFamily='Space Mono'
                        fontSize={{ base: '2xl', lg: '3xl' }}
                        lineHeight={1.1}
                        fontWeight={600}
                        >
                            Gallery
                        </Heading>
                        <Box py={{base: 10, lg: 12}}>
                            <ImageGridPhotoGallery photos={artistProfile.galleryImages} />
                        </Box>
                        </>
                      )}
                  </Box>
                </Box>
              </Grid>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}
                size={'xl'}
                >
                  <Text fontFamily='Space Mono' fontSize={{base: '0.9rem', md: '1.25rem'}}>
                    Close
                  </Text>
                  </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size={{base: 'md', md: "2xl"}} mt={{base: 2, md: 6}} mr={{base: 2, md: 6}} onClick={onClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>


      </Box>
    </ChakraProvider>
  )
}

function Banner(props) {
  const ref = useRef()
  const texture = useTexture('/AFRPCN.svg')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4
    ref.current.material.map.offset.x += delta / 2
  })
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  )
}
