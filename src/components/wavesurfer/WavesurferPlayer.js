// components/WavesurferPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, VStack, HStack, Text, Icon, Spinner } from '@chakra-ui/react'; // Import Chakra UI components
import { Play, Pause } from 'lucide-react'; // Import Play and Pause icons from lucide-react

// No top-level dynamic import of the WaveSurfer library itself here

const WavesurferPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurferInstanceRef = useRef(null); // To store the actual WaveSurfer instance
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure this effect runs only on the client where `window` is available
    if (typeof window === 'undefined' || !waveformRef.current) {
      return;
    }

    let isMounted = true; // To prevent state updates on unmounted component
    setIsLoading(true);
    setError(null);

    // Dynamically import the wavesurfer.js library
    import('wavesurfer.js')
      .then((WaveSurferModule) => {
        if (!isMounted) return;

        const WaveSurfer = WaveSurferModule.default; // Get the default export

        if (!WaveSurfer || typeof WaveSurfer.create !== 'function') {
          console.error("WaveSurfer or WaveSurfer.create is not available after import.");
          setError("Failed to load audio visualization library.");
          setIsLoading(false);
          return;
        }

        // Clean up any existing instance
        if (wavesurferInstanceRef.current) {
          wavesurferInstanceRef.current.destroy();
        }

        // Create a new WaveSurfer instance
        wavesurferInstanceRef.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#080707', // Example: greenish
          progressColor: '#3B8686', // Example: darker green/blue
          cursorColor: '#000000', // Example: red for visibility
          barWidth: 3,
          barRadius: 3,
          responsive: true,
          height: 100,
          normalize: true, // Normalizes the waveform height
          // backend: 'MediaElement', // Consider if you face decoding issues, WebAudio is default
        });

        wavesurferInstanceRef.current.load(audioUrl);

        wavesurferInstanceRef.current.on('ready', () => {
          if (isMounted) setIsLoading(false);
        });

        wavesurferInstanceRef.current.on('play', () => {
          if (isMounted) setIsPlaying(true);
        });
        wavesurferInstanceRef.current.on('pause', () => {
          if (isMounted) setIsPlaying(false);
        });
        wavesurferInstanceRef.current.on('finish', () => {
          if (isMounted) setIsPlaying(false);
        });
        wavesurferInstanceRef.current.on('error', (err) => {
          console.error("Wavesurfer error:", err);
          if (isMounted) {
            setError(`Error loading audio: ${err.message || err}`);
            setIsLoading(false);
          }
        });
      })
      .catch((err) => {
        console.error("Failed to import wavesurfer.js:", err);
        if (isMounted) {
          setError("Failed to load audio visualization library.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      if (wavesurferInstanceRef.current) {
        wavesurferInstanceRef.current.destroy();
        wavesurferInstanceRef.current = null;
      }
    };
  }, [audioUrl]); // Re-initialize if audioUrl changes

  const handlePlayPause = () => {
    if (wavesurferInstanceRef.current) {
      wavesurferInstanceRef.current.playPause();
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <VStack spacing={4} align="stretch">
      <Box ref={waveformRef}  rounded="sm" minH="100px" />
      {isLoading && (
        <HStack>
          <Spinner size="sm" />
          <Text>Loading audio waveform...</Text>
        </HStack>
      )}
      {!isLoading && wavesurferInstanceRef.current && (
        <Button
          onClick={handlePlayPause}
          disabled={isLoading}
          colorScheme="blue"
          leftIcon={<Icon as={isPlaying ? Pause : Play} />}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      )}
      {/* Add more controls as needed: volume, mute, progress bar, etc. */}
    </VStack>
  );
};

export default WavesurferPlayer;

