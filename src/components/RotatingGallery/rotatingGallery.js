// https://cydstumpel.nl/

import * as THREE from 'three'
import { useRef, useState, useEffect, Suspense, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture,
  Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl, Html, Loader
 } from '@react-three/drei'
import { easing } from 'maath'
import './rotatingGalleryUtil'
import { Dialog, Button, CloseButton, Portal, Box , ChakraProvider, Image as ChakraImage, Text, Heading } from '@chakra-ui/react'
import { system } from "@chakra-ui/react/preset";
import React from 'react';
import ImageGridPhotoGallery from '../ImageGrid/imageGridPhotoGallery'
import dynamic from 'next/dynamic';

import WavesurferPlayer from '../wavesurfer/WavesurferPlayer'


const imageGridImages =[

  {   
      src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236519/WhatsApp_Image_2024-06-24_at_16.37.47_spjob2.jpg",
      width: 1527,
      height: 1080,
      caption: "Henry Robinson Lela Pit",
  },
  {   
      src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236508/WhatsApp_Image_2024-06-24_at_16.37.48_3_h2dfyi.jpg",
      width: 1527,
      height: 1080,
      caption: "Henry Robinson Lela Pit",
  },
  {   
      src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236508/WhatsApp_Image_2024-06-24_at_16.37.48_1_iydamo.jpg",
      width: 1527,
      height: 1080,
      caption: "Henry Robinson Lela Pit",
  },
  {   
      src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236509/WhatsApp_Image_2024-06-24_at_16.37.48_oepx0a.jpg",
      width: 854,
      height: 1280,
      caption: "Henry Robinson Lela Pit",
  },
  {   
      src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236508/WhatsApp_Image_2024-06-24_at_16.37.49_2_hap7cd.jpg",
      width: 1280,
      height: 1024,
      caption: "Henry Robinson Lela Pit",
  },
  {   
      src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236510/WhatsApp_Image_2024-06-24_at_16.37.49_pdadpr.jpg",
      width: 1024,
      height: 1280,
      caption: "Henry Robinson Lela Pit",
  },

{   
  src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719235391/WhatsApp_Image_2024-06-24_at_15.23.27_f1iavz.jpg",
  width: 1080,
  height: 608,
  caption: "Henry Robinson Lela Pit",
  },
// {   
//   src: "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719235391/WhatsApp_Image_2024-06-24_at_15.23.29_hbpm28.jpg",
//   width: 1080,
//   height: 608,
//   caption: "Henry Robinson Lela Pit",
//   },

] 



export const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fov = isMobile ? 35 : 20;

  return (
  <>
  <Canvas
    camera={{ position: [0, 0, 100], fov: fov }}
    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
  >
    <Sky />

    <fog attach="fog" args={['#37C6FF', 8.5, 12]} />
    <ScrollControls pages={4} infinite horizontal>
    {/* <Suspense fallback={null}> */}
      <Rig rotation={[0, 0, 0.15]}>
        <Carousel />
      </Rig>
      <Banner position={[0, -0.15, 0]} />
      {/* <Preload all /> */}
      {/* </Suspense> */}

    </ScrollControls>
    <Environment 
    preset='dawn'
     background={false}
     backgroundBlurriness={0.5} 
     blur={1} />
  </Canvas>
  <Loader />
  </>
)};


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
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 10) / 2
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 10) / 2
    cloud0.current.rotation.y -= delta
  })
  return (
    <>
      <SkyImpl />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={8000} 
        // range={range}
        >
          <Cloud ref={cloud0} 
          // {...config} 
          bounds={[x, y, z]} 
          speed={0.1}
          opacity={0.5}
          color={'#FF0000'}
          // color={'#eed0d0'}
           />
          <Cloud 
          // {...config}
           bounds={[x, y, z]} speed={0.1} color="#FF0000" seed={2} position={[15, 0, 0]} />
          {/* <Cloud {...config} bounds={[x, y, z]} color="#d0e0d0" seed={3} position={[-15, 0, 0]} />
          <Cloud {...config} bounds={[x, y, z]} color="#a0b0d0" seed={4} position={[0, 0, -12]} />
          <Cloud {...config} bounds={[x, y, z]} color="#c0c0dd" seed={5} position={[0, 0, 12]} />
          
           */}
          <Cloud concentrate="outside" growth={100} color="#FF0000" opacity={0.5} seed={0.3} bounds={200} volume={200} />
        
          {/* <Cloud concentrate="outside" growth={100} color="#ffccdd" opacity={1.25} seed={0.3} bounds={200} volume={200} /> */}

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
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
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
      <Carousel setCardRefs={setCardRefs} setHandleCardClick={setHandleCardClick} />
    </group>
  );
}

function Carousel({ radius = 1.4, count = 8, setCardRefs, setHandleCardClick }) {
  const [activeCardRef, setActiveCardRef] = useState(null);
  const cardRefs = useRef([]);

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


  const imageUrls = [
    // Replace these with actual image URLs
    "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236519/WhatsApp_Image_2024-06-24_at_16.37.47_spjob2.jpg",
    'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236508/WhatsApp_Image_2024-06-24_at_16.37.48_3_h2dfyi.jpg',
    'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236508/WhatsApp_Image_2024-06-24_at_16.37.48_1_iydamo.jpg',
    'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236509/WhatsApp_Image_2024-06-24_at_16.37.48_oepx0a.jpg',
    'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236508/WhatsApp_Image_2024-06-24_at_16.37.49_2_hap7cd.jpg',
    "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719236510/WhatsApp_Image_2024-06-24_at_16.37.49_pdadpr.jpg",
    "https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1719235391/WhatsApp_Image_2024-06-24_at_15.23.27_f1iavz.jpg",

  ];
  return Array.from({ length: count }, (_, i) => {
    const cardRef = useRef();
    cardRefs.current[i] = cardRef;

    const isDialogOpen = activeCardRef === cardRef;

    return (
      <Card
        key={i}
        url={imageUrls[i % imageUrls.length]}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        ref={cardRef}
        isDialogOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    );
  });
}

const Card = React.forwardRef(({ url, isDialogOpen, onClose, ...props }, ref) => {
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
          <PopUp imageClickedUrl={url} onClose={onClose} />
        </Html>
      )}
    </>
  )
});


const PopUp = ({imageClickedUrl, onClose}) => {
  const [open, setOpen] = useState(true);

  return (
    <ChakraProvider value={system}>
      <Box
      onWheel={(e) => e.stopPropagation()}
      // w={'100vw'}
      >
        <Dialog.Root
        size={{base: 'sm', md: 'xl'}}

        open={open} onOpenChange={(isOpen) => {
           setOpen(isOpen);
           if (!isOpen) {
            onClose();
           }
        }}>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={{base: 2, md: 6}} shadow='3xl' >
            <Dialog.Header>
              <Dialog.Title>
                <Box pt={4}>
                <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontFamily='Space Mono' 
                fontSize={{ base: '2xl', sm: '4xl', lg: '4xl' }}>
                  Artist Title: Art Project Name
                </Heading>
                <Text
                color={'gray.600'}
                fontWeight={300}
                pt={2}
                fontSize={{base:'lg',md:'xl'}}
                fontFamily={'Space Mono'} 
                >                  Artist subtitle
                </Text>
                </Box>
                </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box  display="flex" justifyContent="center" alignItems="center" >
                <ChakraImage src={imageClickedUrl} />
              </Box>

              <Box>
                <Heading pt={{base: 16, md: 20}} fontFamily='Space Mono' 
                fontSize={{ base: '2xl', lg: '3xl' }}
                lineHeight={1.1}
                fontWeight={600}
                >
                    About
                </Heading>


                <Text pt={6} pb={4} fontFamily='Space Mono'
                  fontSize={'lg'}
                >
                  Paragraph 1: High Level description of the Project.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>

              <Box>
                <Heading pt={6} fontFamily='Space Mono' 
                fontSize={{ base: '2xl', lg: '3xl' }}
                lineHeight={1.1}
                fontWeight={600}
                >
                    Voice Note
                </Heading>

                <Box py={4}>
                <WavesurferPlayer audioUrl={'https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm'} /> 
                </Box>                <Text pt={0} pb={4} fontFamily='Space Mono' fontSize={{base: '0.75rem', md: '0.75rem'}}>
                  Audio Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>

              <Box>
              <Text pt={6} pb={4} fontFamily='Space Mono'
                  fontSize={'lg'}
                >                  Paragraph 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>

                <Text pt={6} pb={4} fontFamily='Space Mono'
                  fontSize={'lg'}
                >                Paragraph 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>

                <Text pt={6} pb={4} fontFamily='Space Mono'
                  fontSize={'lg'}
                >                Paragraph 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>

              <Box>
                  <Heading pt={6} fontFamily='Space Mono' 
                fontSize={{ base: '2xl', lg: '3xl' }}
                lineHeight={1.1}
                fontWeight={600}
                >
                    Gallery
                </Heading>
                <Box py={{base: 10, lg: 12}}>
                  <ImageGridPhotoGallery photos={imageGridImages} />
                </Box>
              </Box>




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
