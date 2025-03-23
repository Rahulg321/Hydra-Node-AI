"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

export default function CertificationHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.scale(dpr, dpr);

      drawGrid(ctx, width, height);
    };

    const drawGrid = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      // Create a dark background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.5;
      const gridSize = 70;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Lamp effect - centered, soft glow
      const lampX = width / 2;
      const lampY = height * 0.25;
      const lampRadiusInner = width * 0.1;
      const lampRadiusOuter = width * 0.5;
      const lampGradient = ctx.createRadialGradient(
        lampX,
        lampY,
        lampRadiusInner,
        lampX,
        lampY,
        lampRadiusOuter,
      );

      // Use the provided gradient colors
      lampGradient.addColorStop(0, "rgba(255,195,177,0.3)");
      lampGradient.addColorStop(0.5, "rgba(255,140,105,0.15)");
      lampGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = lampGradient;
      ctx.fillRect(0, 0, width, height);

      // Top bar reflection
      const reflectionHeight = height * 0.15;
      const reflectionGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        reflectionHeight,
      );

      ctx.fillStyle = reflectionGradient;
      ctx.fillRect(0, 0, width, reflectionHeight);

      // Bottom effect - subtle glow/mist
      const bottomEffectHeight = height * 0.2;
      const bottomEffectGradient = ctx.createLinearGradient(
        0,
        height - bottomEffectHeight,
        0,
        height,
      );

      ctx.fillStyle = bottomEffectGradient;
      ctx.fillRect(0, height - bottomEffectHeight, width, bottomEffectHeight);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    const animate = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        if (ctx) {
          drawGrid(ctx, width, height);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden text-white">
      {/* <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ display: "block" }}
      /> */}

      <div className="absolute left-[36.5%] top-[65.5]">
        <span className="text-[40px] text-white">•</span>
      </div>
      <div className="absolute right-[36.5%] top-[65.5]">
        <span className="text-[40px] text-white">•</span>
      </div>
      <div className="absolute bottom-[78.5] right-[36.5%]">
        <span className="text-[40px] text-white">•</span>
      </div>
      <div className="absolute bottom-[78.5] left-[36.5%]">
        <span className="text-[40px] text-white">•</span>
      </div>

      <div className="absolute bottom-0 left-0 z-[-10] h-20 w-full opacity-20">
        <div className="outline-opacity-0 absolute left-0 top-[-420px] h-[0.56px] w-full outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
        <div className="outline-opacity-0 absolute left-0 top-[-30px] h-[0.56px] w-full outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
      </div>

      <div className="absolute bottom-0 left-[480.90px] z-[-10] h-[997.45px] w-20 opacity-20">
        <div className="outline-opacity-0 absolute left-[81.48px] top-0 h-0 w-[997.45px] origin-top-left rotate-90 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
        <div className="outline-opacity-0 absolute left-0 top-0 h-0 w-[997.45px] origin-top-left rotate-90 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
      </div>
      <div className="absolute right-[480.90px] top-[1.72px] h-[1171.12px] w-20 opacity-20">
        <div className="outline-opacity-0 absolute left-[81.48px] top-0 h-0 w-[1171.12px] origin-top-left rotate-90 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
        <div className="outline-opacity-0 absolute left-[2.17px] top-0 h-0 w-[1171.12px] origin-top-left rotate-90 outline outline-[0.56px] outline-offset-[-0.28px] outline-gray-400" />
      </div>

      {/* Join users text */}
      <div className="mb-10 flex items-center gap-1.5 text-sm">
        <Plus className="h-4 w-4" />
        <span className="text-xs">Join 1000+ users</span>
      </div>

      {/* Main heading */}
      <h1 className="transducer-font mb-6 max-w-5xl px-4 text-center text-4xl font-bold leading-tight tracking-wide sm:text-5xl md:text-6xl">
        ACE YOUR CERTIFICATIONS
        <br />
        WITH{" "}
        <span className="bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] bg-clip-text font-bold leading-none tracking-[-0.567px] text-transparent">
          AI-POWERED
        </span>{" "}
        PRECISION
      </h1>

      {/* Subtext */}
      <p className="mb-10 max-w-2xl px-6 text-center text-gray-300">
        Experience the future of exam preparation with Hydranode&apos;s advanced
        AI technology. Get realistic practice, instant feedback, and
        personalized learning paths.
      </p>

      {/* CTA Button */}
      <a
        href="#"
        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a50] to-[#ff9d7a] px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
      >
        Start your free trial
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </a>

      {/* No credit card text */}
      <p className="mt-4 text-sm text-gray-500">No credit card required</p>
    </div>
  );
}
