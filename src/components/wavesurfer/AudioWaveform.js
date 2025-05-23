// components/AudioWaveform.js
import React, { useEffect, useRef, useState } from 'react';

// Example for custom Canvas drawing (simplified)
const CustomCanvasWaveform = ({ audioUrl, width = 600, height = 100 }) => {
  const canvasRef = useRef(null);
  const [waveformData, setWaveformData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // You'd also need an AudioContext instance, probably managed at a higher level
  // or created here and memoized. For simplicity, let's assume it's available.
  // const audioContext = new (window.AudioContext || window.webkitAudioContext)();


  useEffect(() => {
    if (!audioUrl) return;

    let audioContext; // Define here to ensure it's accessible in cleanup

    const processAudio = async () => {
      setIsLoading(true);
      setError(null);
      setWaveformData(null);

      try {
        // Ensure AudioContext is only created client-side
        if (typeof window !== 'undefined') {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } else {
            console.warn("AudioContext not available server-side.");
            setIsLoading(false);
            return;
        }

        const response = await fetch(audioUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        const rawData = audioBuffer.getChannelData(0); // Get data from channel 0
        
        // Downsample data for performance
        const samples = Math.floor(width); // Number of points to draw (e.g., 1 per pixel)
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
          let blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]); // Use absolute values for amplitude
          }
          filteredData.push(sum / blockSize); // Average amplitude in block
        }
        // Normalize
        const multiplier = Math.max(...filteredData) > 0 ? 1 / Math.max(...filteredData) : 0;
        setWaveformData(filteredData.map(n => n * multiplier));

      } catch (e) {
        console.error("Error processing audio:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    processAudio();

    return () => {
      // Cleanup AudioContext if it was created
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [audioUrl, width]); // Rerun if URL or width changes

  useEffect(() => {
    if (!waveformData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Adjust canvas for high DPI screens
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);
    
    // Drawing logic (example: simple line)
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.beginPath();

    const sliceWidth = width * 1.0 / waveformData.length;
    let x = 0;

    for (let i = 0; i < waveformData.length; i++) {
      const v = waveformData[i]; // Normalized 0 to 1
      const y = (1 - v) * height; // Invert and scale
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    // Draw a line in the middle if waveform is drawn mirrored
    // ctx.moveTo(0, height / 2);
    // ctx.lineTo(width, height / 2);

    ctx.stroke();

  }, [waveformData, width, height]);

  if (isLoading) return <p>Loading waveform...</p>;
  if (error) return <p>Error loading waveform: {error}</p>;

  return <canvas ref={canvasRef} />;
};

export default CustomCanvasWaveform;