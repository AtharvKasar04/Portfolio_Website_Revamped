import React, { useEffect, useRef } from "react";

const ParticlesBackground: React.FC = () => {
  // Create a reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure the canvas is available
    const context = canvas.getContext("2d");
    if (!context) return; // Ensure 2D rendering context is available

    // Constants for the particle effect
    const STAR_COLOR = "#fff"; // White star particles
    const STAR_SIZE = 3; // Base size of particles
    const STAR_MIN_SCALE = 0.2; // Minimum scaling factor for stars
    const OVERFLOW_THRESHOLD = 5; // Buffer area outside the screen
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 50; // Number of stars (scales with screen size)

    // Canvas settings
    let scale = window.devicePixelRatio || 1, // Adjust for screen DPI scaling
      width = window.innerWidth * scale, // Set canvas width
      height = window.innerHeight * scale, // Set canvas height
      pointerX: number | null = null, // Track mouse X position
      pointerY: number | null = null; // Track mouse Y position

    // Array to hold star objects
    let stars: { x: number; y: number; z: number }[] = [];
    
    // Velocity object to simulate movement
    let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    // Set the canvas size
    canvas.width = width;
    canvas.height = height;

    /**
     * Generates an array of stars with random positions and scales.
     */
    function generateStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width, // Random X position
          y: Math.random() * height, // Random Y position
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE), // Random depth scaling
        });
      }
    }

    /**
     * The main animation loop that updates and renders stars.
     */
    function step() {
      if (!context) return;
      context.clearRect(0, 0, width, height); // Clear the canvas for redrawing
      update(); // Update star positions
      render(); // Render stars on the canvas
      requestAnimationFrame(step); // Repeat the loop
    }

    /**
     * Updates the star positions based on velocity and movement.
     */
    function update() {
      // Smooth the movement by reducing velocity slightly
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      // Loop through all stars and update their positions
      stars.forEach((star) => {
        // Apply velocity to the stars
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        // Move stars towards/away from the center based on depth
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        // If a star moves outside the threshold, reposition it randomly
        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
          star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
        }
      });
    }

    /**
     * Draws each star on the canvas.
     */
    function render() {
      if (!context) return;

      stars.forEach((star) => {
        context.beginPath();
        context.lineCap = "round"; // Makes the stars appear circular
        context.lineWidth = STAR_SIZE * star.z * scale; // Star size scales with depth
        context.globalAlpha = 0.5 + 0.5 * Math.random(); // Random transparency for twinkling effect
        context.strokeStyle = STAR_COLOR; // Set star color

        // Simulate tail effect based on velocity
        const tailX = velocity.x * 2 || 0.5;
        const tailY = velocity.y * 2 || 0.5;

        // Draw a small line to simulate star movement
        context.moveTo(star.x, star.y);
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    }

    /**
     * Tracks mouse movement and updates velocity accordingly.
     */
    function onMouseMove(event: MouseEvent) {
      if (pointerX !== null && pointerY !== null) {
        let ox = event.clientX - pointerX;
        let oy = event.clientY - pointerY;

        velocity.tx += ox * 0.2;
        velocity.ty += oy * 0.2;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
    }

    /**
     * Resets the pointer tracking when the mouse leaves the window.
     */
    function onMouseLeave() {
      pointerX = null;
      pointerY = null;
    }

    /**
     * Resizes the canvas and regenerates stars when the window size changes.
     */
    function resize() {
      width = window.innerWidth * scale;
      height = window.innerHeight * scale;
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
      generateStars(); // Refresh star positions to fit new screen size
    }

    // Initial setup
    generateStars();
    step();

    // Change these event listeners
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", onMouseMove); // Changed from canvas to document
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove); // Changed from canvas to document
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Keep background behind other content
        backgroundColor: "#1D1616", // Black background for contrast
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticlesBackground;
