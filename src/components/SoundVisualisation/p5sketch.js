import React, { useEffect, useRef, useState } from 'react';
// We will dynamically import createRedRectangleSketch later

const MyComponent = () => {
  const sketchRef = useRef();
  const p5InstanceRef = useRef(null); // To store the p5 instance

  useEffect(() => {
    // Dynamically import the sketch creation function
    import('./RedRectangleSketch').then(async ({ createRedRectangleSketch }) => { // Note the async here to await the import
      // Initialize the sketch once the module is loaded and p5 is imported dynamically within it
      if (sketchRef.current && !p5InstanceRef.current) {
        p5InstanceRef.current = await createRedRectangleSketch(sketchRef.current); // Await the async function call
      }
    }).catch(error => {
      console.error("Failed to load P5 sketch module:", error);
    });

    // Optional: Clean up the sketch when the component unmounts
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div ref={sketchRef} style={{ width: '200px', height: '200px' }}>
      {/* The P5 sketch will be mounted inside this div */}
      {/* You might want to add a loading indicator here */}
    </div>
  );
};

export default MyComponent;
