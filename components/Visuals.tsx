/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, Stars, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { ThemeMode } from '../types';

const FloatingLens = ({ position, scale, speed, rotationSpeed }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * rotationSpeed;
    meshRef.current.rotation.y = t * rotationSpeed * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.2;
  });

  return (
    <Float floatIntensity={2} rotationIntensity={1}>
        <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <MeshTransmissionMaterial 
            backside
            backsideThickness={5}
            thickness={2}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.4}
            anisotropy={0.5}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#ff3131"
        />
        </mesh>
    </Float>
  );
};

const AbstractShape = ({ position, color }: any) => {
    return (
        <Float floatIntensity={1} rotationIntensity={0.5}>
            <mesh position={position}>
                <icosahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.1} 
                    metalness={0.8}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </Float>
    )
}

const InteractiveParticles = ({ count = 200, color }: { count?: number, color: string }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport, mouse } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Mouse interaction
      particle.mx += (mouse.x * viewport.width - particle.mx) * 0.02;
      particle.my += (mouse.y * viewport.height - particle.my) * 0.02;

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshPhongMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.4} />
    </instancedMesh>
  );
};

export const BackgroundScene: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 bg-black">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff0000" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b0000" />
        
        {/* Particle System */}
        <InteractiveParticles color="#ff3131" />

        {/* Floating Glass Elements representing Lenses/Screens */}
        <FloatingLens position={[-5, 3, 0]} scale={1.2} speed={0.5} rotationSpeed={0.2} />
        <FloatingLens position={[6, -3, -2]} scale={1.5} speed={0.3} rotationSpeed={0.15} />
        
        <AbstractShape position={[0, 0, -8]} color="#8b0000" />

        <Environment preset="night" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.1),transparent_70%)]" />
    </div>
  );
};