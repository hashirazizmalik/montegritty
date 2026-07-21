'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BONE = 0xfaf8f5;
const INK = 0x121110;
const CLAY = 0xc84b31;

const FIELD = 240;   // ink points
const NODES = 26;    // clay accent points
const SPREAD_X = 30;
const SPREAD_Y = 16;
const SPREAD_Z = 18;

/**
 * A slow-drifting point field behind the hero. Deliberately quiet — it reads as
 * texture on the ruled grid, not as a 3D showpiece. Fog fades far points into the
 * bone background so the cloud has no visible edge.
 */
export default function HeroCanvas() {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Honour reduced-motion and skip WebGL entirely — the CSS grid alone is a fine fallback.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return; // no WebGL — fall back to the static grid
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BONE, 0.038);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 120);
    camera.position.set(0, 0, 26);

    renderer.setClearColor(BONE, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- geometry -----------------------------------------------------------
    const makeCloud = (count, color, size, opacity) => {
      const pos = new Float32Array(count * 3);
      const drift = new Float32Array(count); // per-point vertical phase offset
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * SPREAD_X;
        pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
        pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z;
        drift[i] = Math.random() * Math.PI * 2;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity,
        depthWrite: false,
        fog: true,
      });
      const points = new THREE.Points(geo, mat);
      points.userData.drift = drift;
      points.userData.base = Float32Array.from(pos);
      return points;
    };

    const field = makeCloud(FIELD, INK, 0.115, 0.5);
    const nodes = makeCloud(NODES, CLAY, 0.2, 0.85);

    const group = new THREE.Group();
    group.add(field, nodes);
    scene.add(group);

    // --- sizing -------------------------------------------------------------
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // pull the camera back on narrow screens so the field still fills the frame
      camera.position.z = w < 760 ? 34 : 26;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- pointer parallax ---------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- loop ---------------------------------------------------------------
    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!running) return;

      const t = clock.getElapsedTime();

      // ease the pointer so parallax never snaps
      pointer.x += (target.x - pointer.x) * 0.035;
      pointer.y += (target.y - pointer.y) * 0.035;

      group.rotation.y = t * 0.028 + pointer.x * 0.18;
      group.rotation.x = Math.sin(t * 0.15) * 0.05 - pointer.y * 0.11;

      // gentle independent bob per point
      for (const cloud of [field, nodes]) {
        const attr = cloud.geometry.attributes.position;
        const { drift, base } = cloud.userData;
        for (let i = 0; i < drift.length; i++) {
          attr.array[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.35 + drift[i]) * 0.42;
        }
        attr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();
    setReady(true);

    // pause offscreen / on hidden tab — no reason to burn battery
    const onVisibility = () => { running = !document.hidden; clock.getDelta(); };
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => { running = entry.isIntersecting && !document.hidden; },
      { threshold: 0 }
    );
    io.observe(mount);

    // --- teardown -----------------------------------------------------------
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      for (const cloud of [field, nodes]) {
        cloud.geometry.dispose();
        cloud.material.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`hero-canvas${ready ? ' ready' : ''}`} aria-hidden="true" />;
}
