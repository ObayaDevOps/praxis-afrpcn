// src/components/SoundVisualisation/SoundVisualizer.jsx
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound'; // Import p5.sound library

// TODO: You will need to import or define your custom visualization classes
// and the COLORSCHEME object here or ensure they are globally accessible if
// that's how they are structured in your project.
// import { ScrollingWaveform } from './ScrollingWaveform';
// import { Spectrogram } from './Spectrogram';
// import { InstantWaveformVis } from './InstantWaveformVis';
// import { SpectrumVisualizer } from './SpectrumVisualizer';
// import { SpectrumBarGraph } from './SpectrumBarGraph';
// import { COLORSCHEME } from './colorSchemes'; // Assuming COLORSCHEME is in a file named colorSchemes.js

const SoundVisualizer = (props) => {
  const sketchRef = useRef();

  useEffect(() => {
    // This is the p5 sketch function using instance mode
    const sketch = (p) => {

      // Declare variables here but initialize in setup if they depend on p5 functions
      let mic, fft;
      let micSetupError;
      let waveformBuffer = []; // This might need adjustment depending on its use
      let instantWaveFormVis;
      let spectrumVis;
      let spectrumBarGraph;
      let scrollingWaveform;
      let scrollingSpectrogram;
      let backgroundColor;
      let visualizations = [];
      let playSong = true; // change to false if you only want to use mic input
      let song;

      const numFftBins = 1024;
      const showLengthInSeconds = 15;
      let colorSchemeIndex = 0;

      // Ensure COLORSCHEME, and visualization classes are accessible here
      // For example, if imported, they will be. If globally available, they will be.

      p.preload = () => {
        // Assumes 'assets/ImogenHeap_HideAndSeek_Edited.mp3' is in the public directory
        song = p.loadSound('/assets/ImogenHeap_HideAndSeek_Edited.mp3');
      };

      p.setup = () => {
        let canvasWidth = 900; // You might want to make this dynamic via props
        let canvasHeight = 600; // You might want to make this dynamic via props

        // if(goFullScreen){ // goFullScreen is not defined, assuming it was meant to be a prop or removed
        //   canvasWidth = p.windowWidth;
        //   canvasHeight = p.windowHeight;
        // }

        p.createCanvas(canvasWidth, canvasHeight);

        mic = new p5.AudioIn(); // Using p5.AudioIn directly is fine here
        mic.start(audioInErrorCallback); // Pass the callback directly

        // Need to define audioInErrorCallback within the sketch or make it accessible
        function audioInErrorCallback(){
          p.print("Error setting up the microphone input");
        }

        let micSamplingRate = p.sampleRate();
        p.print(mic);
        // https://p5js.org/reference/#/p5.AudioIn/getSources
        mic.getSources(function(devices) {
          // https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo
          devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
                        " id = " + device.deviceId);
          });
        });
        p.print("Sampling rate:", p.sampleRate(), "Master volume:", p.getMasterVolume());

        let songSamplingRate = song.sampleRate();
        p.print("Song sampling rate:", songSamplingRate, "Channels:", song.channels());
        let samplingRate = songSamplingRate; // Using song sampling rate

        fft = new p5.FFT(0, numFftBins); // Using p5.FFT directly is fine here
        fft.setInput(mic);

        // If you want to only use the microphone, change playSong to false
        if(playSong){
          song.play();
          fft.setInput(song);
        }

        backgroundColor = p.color(90);

        // split the canvas into different parts for the visualization
        let yTop = 0;
        let yHeight = p.height / 3;
        // Ensure these classes are available in this scope
        scrollingWaveform = new ScrollingWaveform(0, yTop, p.width, yHeight, backgroundColor, showLengthInSeconds, p); // Pass p instance
        yTop = scrollingWaveform.getBottom();
        scrollingSpectrogram = new Spectrogram(0, yTop, p.width, yHeight, backgroundColor, showLengthInSeconds, p); // Pass p instance

        let xBottomWidth = p.width / 3;
        let xBottom = 0;

        // when we call fft.waveform(), this function returns an array of sound amplitude values
        // (between -1.0 and +1.0). Length of this buffer is equal to bins (defaults to 1024).
        let lengthOfOneWaveformBufferInSecs = numFftBins/samplingRate;
        yTop = scrollingSpectrogram.getBottom();
        instantWaveFormVis = new InstantWaveformVis(xBottom, yTop, xBottomWidth, yHeight, backgroundColor, lengthOfOneWaveformBufferInSecs, p); // Pass p instance
        xBottom += xBottomWidth;
        spectrumVis = new SpectrumVisualizer(xBottom, yTop, xBottomWidth, yHeight, backgroundColor, p); // Pass p instance
        xBottom += xBottomWidth;
        spectrumBarGraph = new SpectrumBarGraph(xBottom, yTop, xBottomWidth, yHeight, backgroundColor, p); // Pass p instance

        // Put all visuzliations into an array, which helps for setting up
        // color schemes, etc.
        visualizations.push(scrollingWaveform);
        visualizations.push(scrollingSpectrogram);
        visualizations.push(instantWaveFormVis);
        visualizations.push(spectrumVis);
        visualizations.push(spectrumBarGraph);

        p.noFill();

        //frameRate(2); // slow down draw rate for debugging
      };

      // mouseClicked is part of the p5 sketch, no need for a separate function
      // p.mouseClicked = () => {
        // mic.start(); // Don't restart mic on every click
        // fft = new p5.FFT(0, numFftBins); // Don't recreate FFT on every click
        // fft.setInput(mic); // Set input once in setup
      // };

      p.draw = () => {
        //p.background(220); // Background is drawn by the visualizations

        let waveform = fft.waveform(); // analyze the waveform
        let spectrum = fft.analyze();

        instantWaveFormVis.update(waveform);
        instantWaveFormVis.draw();

        scrollingWaveform.update(waveform);
        scrollingWaveform.draw();

        scrollingSpectrogram.update(spectrum);
        scrollingSpectrogram.draw();

        spectrumBarGraph.update(spectrum);
        spectrumBarGraph.draw();

        spectrumVis.update(spectrum);
        spectrumVis.draw();

        //p.print((waveform.length / p.sampleRate()) * 1000 + "ms");
        p.fill(255);
        p.text("fps: " + p.nfc(p.frameRate(), 1), 6, 15);

        //p.print(mic);
        //p.print(mic.getSources());
      };

      p.keyPressed = () => {
        p.print(p.key);
        if(p.key == 'c'){
          colorSchemeIndex++;

          // Ensure COLORSCHEME is available here
          let colorSchemes = Object.entries(COLORSCHEME)
          //p.print(tmp);

          //let colorSchemes = Object.keys(COLORSCHEME);
          if(colorSchemeIndex >= colorSchemes.length){
            colorSchemeIndex = 0;
          }

          p.print(colorSchemes);
          p.print("COLORSCHEME", COLORSCHEME, 'colorSchemes[colorSchemeIndex]', colorSchemes[colorSchemeIndex]);
          p.print("colorSchemeIndex", colorSchemeIndex, "colorSchemes.length", colorSchemes.length);

          for(let vis of visualizations){
            if(vis.colorScheme){
              let colorSchemeArray = colorSchemes[colorSchemeIndex];
              //vis.colorScheme = colorSchemes[colorSchemeIndex];
              vis.colorScheme = colorSchemeArray[1];
              //vis.colorScheme = COLORSCHEME.GRAYSCALE;
              //p.print("Set vis", vis, " to ", colorSchemeIndex, "colorSchemes[colorSchemeIndex]", colorSchemes[colorSchemeIndex]);
            }
          }
        }
      };
    };

    // Create a new p5 instance and attach it to the container div
    const p5Instance = new p5(sketch, sketchRef.current);

    // Return a cleanup function
    return () => {
      // Remove the p5 sketch when the component unmounts
      p5Instance.remove();
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    // This div will host the p5.js canvas
    <div ref={sketchRef}>
      {/* The p5 canvas will be appended here */}
    </div>
  );
};

export default SoundVisualizer;