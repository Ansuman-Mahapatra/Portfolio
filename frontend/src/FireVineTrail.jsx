import React, { useEffect, useRef } from 'react';

export default function FireVineTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Orange / Fire palette for the living vines
    const colors = ['#ff4500', '#ff8c00', '#ff2a00', '#ff6600', '#ffb347'];
    let tendrils = [];
    
    // Configurations
    const maxTendrils = 80;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, moved: false };
    let lastMouse = { x: mouse.x, y: mouse.y };

    class Tendril {
      constructor(x, y, angle, size) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
        this.history = [{ x, y }];
        this.size = size || Math.random() * 2 + 1.5;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 40; // How long a vine branch lives
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = angle;
        this.speed = Math.random() * 2 + 1;
        this.splitConfig = Math.random() < 0.2; // 20% chance to spawn a sub-branch
      }

      update() {
        this.life++;
        // Organic wiggle and drifting (the "living vine" effect)
        this.angle += (Math.random() - 0.5) * 0.3;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        this.x += this.vx;
        this.y += this.vy;

        this.history.push({ x: this.x, y: this.y });

        // Maintain history size to avoid massive array memory
        if (this.history.length > 30) {
          this.history.shift();
        }

        // Draw organic branch segment
        ctx.beginPath();
        if (this.history.length > 2) {
          const prev = this.history[this.history.length - 2];
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(this.x, this.y);
        } else {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + 0.1, this.y);
        }

        // Fading size as it reaches end of life
        const currentSize = this.size * (1 - this.life / this.maxLife);
        ctx.lineWidth = Math.max(0.1, currentSize);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Autonomously sprout new tendril branches organically
        if (this.splitConfig && this.life % 25 === 0 && tendrils.length < maxTendrils * 2) {
            tendrils.push(new Tendril(this.x, this.y, this.angle + (Math.random() > 0.5 ? 0.7 : -0.7), currentSize * 0.8));
        }
      }
    }

    const mouseMove = (e) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
      
      // Calculate angle of mouse movement to spawn vines backwards or organically
      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5);

      // Spawn new tendril tracing the mouse path
      if (tendrils.length < maxTendrils) {
         tendrils.push(new Tendril(mouse.x, mouse.y, angle, Math.random() * 3 + 2));
      }
    };
    
    window.addEventListener('mousemove', mouseMove);

    function loop() {
      // Fade out old vines towards transparency (destination-out subtraction)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw new vines normally
      ctx.globalCompositeOperation = 'source-over';

      for (let i = 0; i < tendrils.length; i++) {
        const t = tendrils[i];
        t.update();
        if (t.life >= t.maxLife || t.size <= 0.1) {
          tendrils.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Crucial so you can still click things underneath
        zIndex: 40,
        mixBlendMode: 'screen'
      }}
    />
  );
}
