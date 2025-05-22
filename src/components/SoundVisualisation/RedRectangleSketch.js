
const sketch = (p) => {
  p.setup = () => {
    // Create a canvas
    p.createCanvas(200, 200); // You can adjust the size as needed
  };

  p.draw = () => {
    // Set the fill color to red
    p.fill(255, 0, 0);
    // Draw a rectangle
    p.rect(50, 50, 100, 100); // x, y, width, height
  };
};

export const createRedRectangleSketch = async (containerRef) => {
  // Dynamically import p5 inside the function that uses it
  const p5 = await import('p5');
  // Now use the imported p5 object (accessing the default export)
  return new p5.default(sketch, containerRef);
};
