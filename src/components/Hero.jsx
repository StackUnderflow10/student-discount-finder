import { Canvas, useThree } from "@react-three/fiber"
import { Float, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"

function Book({ position, rotation, scale, color = "#4338ca" }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 1.4, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[position[0] + 0.02, position[1], position[2]]} rotation={rotation} scale={scale}>
        <boxGeometry args={[0.92, 1.32, 0.12]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
      </mesh>
    </Float>
  )
}

function Pencil({ position, rotation, scale }) {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 2, 6]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.4} />
        </mesh>
        <mesh position={[0, -1.1, 0]}>
          <coneGeometry args={[0.05, 0.2, 6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
          <meshStandardMaterial color="#ec4899" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  )
}

function GraduationCap({ position, rotation, scale }) {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.2, 0.05, 1.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>
    </Float>
  )
}

function Calculator({ position, rotation, scale }) {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.7}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <boxGeometry args={[0.6, 0.9, 0.08]} />
          <meshStandardMaterial color="#334155" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.25, 0.05]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial color="#94a3b8" emissive="#94a3b8" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

function Lightbulb({ position, scale }) {
  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.9}>
      <group position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.3} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.15, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

function ResponsiveCamera() {
  const { size } = useThree()
  const isMobile = size.width < 768

  return (
    <PerspectiveCamera 
      makeDefault 
      position={[0, 0, isMobile ? 18 : 10]} 
      fov={isMobile ? 60 : 50}
    />
  )
}

function Scene() {
  return (
    <>
      <ResponsiveCamera />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={0.5} />
      <Environment preset="city" />

      <Book position={[-6, 2, -2]} rotation={[0.3, 0.5, -0.2]} scale={0.8} color="#6366f1" />
      <Book position={[-7, -1, -1]} rotation={[-0.2, 0.8, 0.1]} scale={0.6} color="#8b5cf6" />
      <Pencil position={[-5, -3, -1.5]} rotation={[0, 0, 0.4]} scale={0.7} />
      <Lightbulb position={[-6.5, 3.5, -2]} scale={0.8} />

      <GraduationCap position={[6, 2.5, -2]} rotation={[0.2, -0.3, 0.1]} scale={0.7} />
      <Book position={[7, -0.5, -1.5]} rotation={[0.1, -0.6, 0.2]} scale={0.7} color="#3b82f6" />
      <Calculator position={[5.5, -2.5, -1]} rotation={[0.2, 0.3, -0.1]} scale={0.9} />
      <Pencil position={[7.5, 1, -2]} rotation={[0.5, 0, -0.3]} scale={0.6} />

      <Book position={[-3, 4, -4]} rotation={[0.2, 0.3, 0]} scale={0.5} color="#4338ca" />
      <Book position={[4, -4, -3]} rotation={[-0.3, -0.5, 0.1]} scale={0.5} color="#7c3aed" />
      <Lightbulb position={[3, 4, -3.5]} scale={0.6} />
    </>
  )
}

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <h1 className="text-black text-5xl md:text-8xl font-bold text-center leading-tight">
          Welcome Student!
        </h1>
      </div>
    </div>
  )
}