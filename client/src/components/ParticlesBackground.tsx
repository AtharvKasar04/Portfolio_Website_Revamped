import React, { useEffect, useRef } from "react";

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const STAR_COLOR = "#fff";
    const STAR_SIZE = 3;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 5;
    const STAR_COUNT = Math.floor((window.innerWidth + window.innerHeight) / 70); 

    let scale = window.devicePixelRatio || 1;
    let width = window.innerWidth * scale;
    let height = window.innerHeight * scale;
    let pointerX: number | null = null;
    let pointerY: number | null = null;

    let stars: { x: number; y: number; z: number }[] = [];
    let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    // Set up canvas with proper resolution
    function setCanvasSize() {
      if (!canvas || !context) return;
      scale = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Ensure high-DPI scaling for mobile screens
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.scale(scale, scale);
    }

    function generateStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }

    function step() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      update();
      render();
      requestAnimationFrame(step);
    }

    function update() {
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

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

    function render() {
      if (!context) return;

      stars.forEach((star) => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z;
        context.globalAlpha = 0.6 + 0.4 * Math.random();
        context.strokeStyle = STAR_COLOR;

        const tailX = velocity.x * 2 || 0.5;
        const tailY = velocity.y * 2 || 0.5;

        context.moveTo(star.x, star.y);
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    }

    function onMouseMove(event: MouseEvent) {
      if (pointerX !== null && pointerY !== null) {
        let ox = event.clientX - pointerX;
        let oy = event.clientY - pointerY;
        velocity.tx += ox * 0.15;
        velocity.ty += oy * 0.15;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
    }

    function onMouseLeave() {
      pointerX = null;
      pointerY = null;
    }

    function resize() {
      let oldStars = [...stars]; // Save old stars

      setCanvasSize();

      // Instead of regenerating all stars, smoothly reposition existing ones
      stars = oldStars.map((star) => ({
        x: (star.x / width) * window.innerWidth,
        y: (star.y / height) * window.innerHeight,
        z: star.z,
      }));
    }

    // Initial setup
    setCanvasSize();
    generateStars();
    step();

    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
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
        zIndex: 0,
        backgroundColor: "#1D1616",
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticlesBackground;
