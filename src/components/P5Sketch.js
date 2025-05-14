// components/P5Sketch.js
import p5 from 'p5';

const sketch = (p, props) => {
  let nodes = [];
  let edges = [];
  let rotationAngle = 0;
  const nodeRadius = 20;
  let canvas;
  let centerX, centerY;

  // Node class
  class Node {
    constructor(id, x, y, data) {
      this.id = id;
      this.originalX = x; // Store original position for rotation
      this.originalY = y;
      this.x = x; // Current screen position
      this.y = y;
      this.data = data;
      this.radius = nodeRadius;
      this.isHovered = false;
    }

    updatePosition(angle) {
      // Rotate around canvas center
      const rotatedX = (this.originalX - centerX) * p.cos(angle) - (this.originalY - centerY) * p.sin(angle) + centerX;
      const rotatedY = (this.originalX - centerX) * p.sin(angle) + (this.originalY - centerY) * p.cos(angle) + centerY;
      this.x = rotatedX;
      this.y = rotatedY;
    }

    display() {
      this.isHovered = p.dist(p.mouseX, p.mouseY, this.x, this.y) < this.radius;

      p.stroke(this.isHovered ? 200 : 150);
      p.strokeWeight(this.isHovered ? 3 : 1);
      p.fill(this.isHovered ? [100, 150, 255] : [50, 100, 200]);
      p.ellipse(this.x, this.y, this.radius * 2);

      p.fill(255);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(10);
      // Display a short name or ID
      const nameParts = this.data.name.split(' ');
      p.text(nameParts.length > 1 ? nameParts[1] : nameParts[0], this.x, this.y);
    }

    clicked() {
      if (this.isHovered) {
        props.onNodeClick(this.data);
        return true;
      }
      return false;
    }
  }

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth * 0.9, p.windowHeight * 0.8); // Adjust size as needed
    canvas.parent(props.canvasParentRef.current); // Attach to the div
    p.angleMode(p.RADIANS);

    centerX = p.width / 2;
    centerY = p.height / 2;

    // Initialize nodes
    const artistData = props.artists;
    const numNodes = artistData.length;
    const layoutRadius = p.min(p.width, p.height) / 3; // Radius for circular layout

    artistData.forEach((artist, i) => {
      // Simple circular layout for initial positions
      const angle = p.map(i, 0, numNodes, 0, p.TWO_PI);
      const x = centerX + layoutRadius * p.cos(angle);
      const y = centerY + layoutRadius * p.sin(angle);
      nodes.push(new Node(artist.id, x, y, artist));
    });

    // Initialize edges
    edges = props.connections.map(conn => ({
      source: nodes.find(n => n.id === conn.source),
      target: nodes.find(n => n.id === conn.target),
    }));

    // Expose a function to update rotation from React
    p.updateRotation = (delta) => {
      rotationAngle += delta * 0.001; // Adjust sensitivity
      p.loop(); // Ensure draw is called if noLoop was used
    };
    p.noLoop(); // Only redraw when needed (e.g., on scroll or mouse interaction)
  };

  p.draw = () => {
    p.background(20, 20, 30); // Dark background

    // Update node positions based on rotation
    nodes.forEach(node => node.updatePosition(rotationAngle));

    // Draw edges
    p.stroke(100, 100, 120);
    p.strokeWeight(1.5);
    edges.forEach(edge => {
      if (edge.source && edge.target) {
        p.line(edge.source.x, edge.source.y, edge.target.x, edge.target.y);
      }
    });

    // Draw nodes
    nodes.forEach(node => node.display());
  };

  p.mousePressed = () => {
    let nodeClicked = false;
    for (let node of nodes) {
      if (node.clicked()) {
        nodeClicked = true;
        break;
      }
    }
    if (nodeClicked) p.loop(); // Redraw to show hover effect if any
    return !nodeClicked; // Prevent default if a node was clicked
  };

  p.mouseMoved = () => {
    let needsRedraw = false;
    for (let node of nodes) {
        const prevHover = node.isHovered;
        node.isHovered = p.dist(p.mouseX, p.mouseY, node.x, node.y) < node.radius;
        if (prevHover !== node.isHovered) {
            needsRedraw = true;
        }
    }
    if (needsRedraw) p.loop();
  }

  // Call loop once at the start to draw the initial state
  p.setupDone = () => {
    p.loop();
  }
};


// React wrapper component
const P5SketchComponent = (props) => {
  const sketchRef = React.useRef();
  const p5InstanceRef = React.useRef(null); // To store the p5 instance

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !p5InstanceRef.current) { // Ensure this runs only client-side
      p5InstanceRef.current = new p5((p) => sketch(p, { ...props, canvasParentRef: sketchRef }), sketchRef.current);
      p5InstanceRef.current.setupDone(); // Call after setup
    }
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Expose updateRotation to parent
  React.useEffect(() => {
    if (props.onSketchReady && p5InstanceRef.current) {
      props.onSketchReady({
        updateRotation: (delta) => {
          if (p5InstanceRef.current && typeof p5InstanceRef.current.updateRotation === 'function') {
            p5InstanceRef.current.updateRotation(delta);
          }
        }
      });
    }
  }, [props.onSketchReady]);

  return <div ref={sketchRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
};

// Need to import React for JSX and hooks
import React from 'react';
export default P5SketchComponent;