import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Grid,
  OrbitControls,
  PerspectiveCamera,
  shaderMaterial,
  useHelper,
} from '@react-three/drei';
import { useControls, folder } from 'leva';
import vertex from './vertex';
import fragmentShader from './fragment';
import { DoubleSide } from 'three';

const Sphere = () => {
  const meshRef = useRef();
  const matRef = useRef();

  // mat.uniforms['time'].value = options.perlin.speed * (Date.now() - start);
  // mat.uniforms['pointscale'].value = options.perlin.perlins;
  // mat.uniforms['decay'].value = options.perlin.decay;
  // mat.uniforms['complex'].value = options.perlin.complex;
  // mat.uniforms['waves'].value = options.perlin.waves;
  // mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
  // mat.uniforms['r_color'].value = options.rgb.r_color;
  // mat.uniforms['g_color'].value = options.rgb.g_color;
  // mat.uniforms['b_color'].value = options.rgb.b_colorf;
  // mat.uniforms['fragment'].value = options.perlin.fragment;

  const options = {
    perlin: {
      vel: 0.002,
      perlins: 1.0,
      decay: 0.4,
      complex: 0.0,
      waves: 10.0,
      eqcolor: 11.0,
      fragment: true,
      redhell: true,
    },
    rgb: {
      r_color: 6.0,
      g_color: 0.0,
      b_color: 0.2,
    },
    cam: {
      zoom: 10,
    },
  };

  useControls('sphere', {
    eqcolor: {
      value: options.perlin.eqcolor,
      min: 3.0,
      max: 50.0,
      onChange: (v) => {
        matRef.current.uniforms.eqcolor.value = v;
      },
    },
    red: {
      value: options.rgb.r_color,
      min: 0.0,
      max: 10.0,
      onChange: (v) => {
        matRef.current.uniforms.r_color.value = v;
      },
    },
    green: {
      value: options.rgb.g_color,
      min: 0.0,
      max: 10.0,
      onChange: (v) => {
        matRef.current.uniforms.g_color.value = v;
      },
    },
    blue: {
      value: options.rgb.b_color,
      min: 0.0,
      max: 10.0,
      onChange: (v) => {
        matRef.current.uniforms.b_color.value = v;
      },
    },
    decay: {
      value: options.perlin.decay,
      min: 0.0,
      max: 1.0,
      onChange: (v) => {
        matRef.current.uniforms.decay.value = v;
      },
    },
    waves: {
      value: options.perlin.waves,
      min: 0.0,
      max: 10.0,
      onChange: (v) => {
        matRef.current.uniforms.waves.value = v;
      },
    },
  });

  useFrame((state) => {
    uniforms.current.time.value = state.clock.elapsedTime / 5;
    meshRef.current.rotation.y += 0.001;
  });

  useEffect(() => {
    console.log(matRef.current.uniforms);
  }, [matRef]);

  const uniforms = useRef({
    time: {
      type: 'f',
      value: 1.0,
    },
    pointscale: {
      type: 'f',
      value: 1.0,
    },
    decay: {
      type: 'f',
      value: 0.39,
    },
    complex: {
      type: 'f',
      value: 3.0,
    },
    waves: {
      type: 'f',
      value: 3.0,
    },
    eqcolor: {
      type: 'f',
      value: 11.5,
    },
    fragment: {
      type: 'i',
      value: false,
    },
    dnoise: {
      type: 'f',
      value: 0.0,
    },
    qnoise: {
      type: 'f',
      value: 4.0,
    },
    r_color: {
      type: 'f',
      value: 1.8,
    },
    g_color: {
      type: 'f',
      value: 1.8,
    },
    b_color: {
      type: 'f',
      value: 1.5,
    },
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={35} position={[0, 0, 10]} />
      <hemisphereLight args={[0xffffff, 0x000000, 0.2]} />
      <OrbitControls panSpeed={2} zoomSpeed={2} />
      {/* <Grid sectionSize={10} /> */}

      <mesh ref={meshRef}>
        <icosahedronGeometry DoubleSide args={[1, 6]} />
        <shaderMaterial
          ref={matRef}
          fragmentShader={fragmentShader}
          vertexShader={vertex}
          uniforms={uniforms.current}
        />
      </mesh>
    </>
  );
};

export default Sphere;
