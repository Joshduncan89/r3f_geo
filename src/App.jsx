import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBO } from '@react-three/drei';
import FBOParticles from './components/earth/index';
import Sphere from './components/sphere/Sphere';
import './App.css';

function App() {
  return (
    <Canvas
      shadows={true}
      style={{ background: 'black', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" color="black" near={5} far={15} />
        <Sphere />
      </Suspense>
    </Canvas>
  );
}

export default App;
