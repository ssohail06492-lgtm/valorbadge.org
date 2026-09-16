import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
  phase: number;
  color: string;
}

interface PulsePacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export const SignatureCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { reducedMotion } = useApp();
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 18 : 42;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handlePointerLeave = () => {
      mousePosRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Reduced motion mode: Draw static, refined high-contrast dark navy cyber grid
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      
      // Static dark navy background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#040914');
      bgGrad.addColorStop(0.5, '#061124');
      bgGrad.addColorStop(1, '#07162e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Fine grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Static crosshair markers
      ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
      for (let x = gridSize; x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height; y += gridSize * 2) {
          ctx.fillRect(x - 2, y, 5, 1);
          ctx.fillRect(x, y - 2, 1, 5);
        }
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerleave', handlePointerLeave);
      };
    }

    // Initialize lightweight nodes
    const nodes: NodePoint[] = [];
    const colors = [
      'rgba(56, 189, 248, 0.75)', // cyan/sky
      'rgba(99, 102, 241, 0.65)', // indigo
      'rgba(45, 212, 191, 0.65)', // teal
      'rgba(14, 165, 233, 0.55)', // ocean blue
    ];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
        radius: Math.random() * 1.8 + 1.2,
        phase: Math.random() * Math.PI * 2,
        color: colors[i % colors.length],
      });
    }

    // Flowing connection signal packets
    const packets: PulsePacket[] = [
      { fromIndex: 0, toIndex: 1, progress: 0, speed: 0.015 },
      { fromIndex: 2, toIndex: 3, progress: 0.5, speed: 0.02 },
      { fromIndex: 4, toIndex: 5, progress: 0.2, speed: 0.012 },
    ];

    let time = 0;
    const maxDistance = isMobile ? 85 : 125;
    const gridSize = 64;

    const render = () => {
      time += 0.007;

      // 1. Dark navy gradient background with subtle time-based flow
      const grad = ctx.createLinearGradient(
        0,
        0,
        width + Math.sin(time * 0.4) * 60,
        height + Math.cos(time * 0.4) * 60
      );
      grad.addColorStop(0, '#040814');
      grad.addColorStop(0.45, '#061124');
      grad.addColorStop(0.85, '#071732');
      grad.addColorStop(1, '#050c1c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Lightweight Digital Coordinate Grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.035)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Subtle crosshairs at alternating intersections
      ctx.fillStyle = 'rgba(6, 182, 212, 0.09)';
      const step = gridSize * 2;
      for (let x = gridSize; x < width; x += step) {
        for (let y = gridSize; y < height; y += step) {
          ctx.fillRect(x - 2, y, 5, 1);
          ctx.fillRect(x, y - 2, 1, 5);
        }
      }

      // 3. Subtle abstract orbital pathway rings
      const ringCenterX = width * 0.72;
      const ringCenterY = height * 0.35;
      ctx.save();
      ctx.translate(ringCenterX, ringCenterY);
      ctx.rotate(time * 0.04);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 160 + Math.sin(time) * 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.035)';
      ctx.setLineDash([6, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 4. Update and Draw Nodes & Flowing Connection Lines
      const mouse = mousePosRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Boundary wrap
        if (node.x < 0) node.x = width;
        else if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        else if (node.y > height) node.y = 0;

        // Pointer proximity gentle repulse (desktop only for battery performance)
        if (mouse.active && !isMobile) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            node.x -= (dx / dist) * force * 1.2;
            node.y -= (dy / dist) * force * 1.2;
          }
        }

        // Draw particle node
        const pulseRadius = node.radius + Math.sin(time * 2 + node.phase) * 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.8, pulseRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Connect neighboring nodes with distance-based alpha
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      // 5. Flowing photon pulses along lines
      for (let p = 0; p < packets.length; p++) {
        const packet = packets[p];
        packet.progress += packet.speed;
        if (packet.progress > 1) {
          packet.progress = 0;
          packet.fromIndex = Math.floor(Math.random() * nodes.length);
          packet.toIndex = Math.floor(Math.random() * nodes.length);
        }

        const fromNode = nodes[packet.fromIndex];
        const toNode = nodes[packet.toIndex];
        if (fromNode && toNode) {
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance * 1.5) {
            const px = fromNode.x + dx * packet.progress;
            const py = fromNode.y + dy * packet.progress;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      id="valorbadge-canvas-background"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
