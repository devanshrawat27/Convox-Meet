import React from "react";
import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  return (
    <Particles
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      options={{
        particles: {
          number: { value: 80, limit: 120 },
          color: { value: ["#22d3ee", "#4f46e5", "#ff9839"] },
          shape: { type: "circle" },
          size: { value: { min: 2, max: 5 } },
          move: {
            enable: true,
            speed: 2,
            outModes: "bounce",
          },
          links: {
            enable: true,
            distance: 130,
            color: "#22d3ee",
            opacity: 0.6,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.9 } },
            push: { quantity: 4 },
          },
        },
        fullScreen: { enable: false },
      }}
    />
  );
}
