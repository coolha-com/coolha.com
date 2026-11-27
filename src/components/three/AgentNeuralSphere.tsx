'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ACCENT = '#C8F237';
const NODE_COUNT = 72;
const RADIUS = 1.95;

/** 斐波那契球面均匀分布，避免两极聚集 */
function useSphereNodes() {
  return useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * r * RADIUS,
          y * RADIUS,
          Math.sin(theta) * r * RADIUS,
        ),
      );
    }
    return pts;
  }, []);
}

/** 节点用 InstancedMesh 渲染，逐帧做错峰脉冲 */
function Nodes({ nodes }: { nodes: THREE.Vector3[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    nodes.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.scale.setScalar(0.75 + Math.sin(t * 1.5 + i * 0.62) * 0.4);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, nodes.length]}>
      <sphereGeometry args={[0.055, 8, 8]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={0.92} depthWrite={false} />
    </instancedMesh>
  );
}

/** 相邻节点之间的连线，构成神经网络拓扑 */
function Links({ nodes }: { nodes: THREE.Vector3[] }) {
  const positions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.2) {
          arr.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(arr);
  }, [nodes]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={ACCENT} transparent opacity={0.16} depthWrite={false} />
    </lineSegments>
  );
}

function NeuralSphere() {
  const group = useRef<THREE.Group>(null);
  const nodes = useSphereNodes();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.11;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.18,
      0.04,
    );
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0.12]}>
      <Links nodes={nodes} />
      <Nodes nodes={nodes} />
    </group>
  );
}

export default function AgentNeuralSphere({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <NeuralSphere />
      </Canvas>
    </div>
  );
}
