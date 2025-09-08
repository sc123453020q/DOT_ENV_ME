import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

export default function FlameTest() {
  const [selectedSalt, setSelectedSalt] = useState(null);
  const [platinumPicked, setPlatinumPicked] = useState(false);
  const [dipped, setDipped] = useState(false);
  const [burnerOn, setBurnerOn] = useState(false);

  const salts = [
    { id: 1, name: "Sodium Chloride", color: "yellow" },
    { id: 2, name: "Potassium Chloride", color: "violet" },
    { id: 3, name: "Copper Sulfate", color: "green" },
    { id: 4, name: "Calcium Chloride", color: "orange" },
  ];

  // Wire animation states
  const { wirePos } = useSpring({
    wirePos: burnerOn
      ? [0, 1.5, 0] // above flame
      : dipped
      ? [-2, -0.3, 0] // dipped in beaker
      : platinumPicked
      ? [2, 0, 0] // picked
      : [5, 0, 0], // offscreen initially
    config: { mass: 1, tension: 180, friction: 20 },
  });

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Controls */}
      <div className="p-4 flex gap-4 items-center">
        {/* Step 1: Select Salt */}
        <select
          onChange={(e) =>
            setSelectedSalt(salts.find((s) => s.id === Number(e.target.value)))
          }
          className="px-4 py-2 border rounded"
        >
          <option value="">👉 Select Salt First</option>
          {salts.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Step 2: Pick Wire */}
        <button
          onClick={() => selectedSalt && setPlatinumPicked(true)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
          disabled={!selectedSalt}
        >
          Pick Platinum Wire
        </button>

        {/* Step 3: Dip */}
        <button
          onClick={() => platinumPicked && setDipped(true)}
          className="px-4 py-2 bg-blue-200 rounded disabled:opacity-40"
          disabled={!platinumPicked}
        >
          Dip in HCl + Salt
        </button>

        {/* Step 4: Ignite */}
        <button
          onClick={() => dipped && setBurnerOn(true)}
          className="px-4 py-2 bg-orange-200 rounded disabled:opacity-40"
          disabled={!dipped}
        >
          Ignite Burner
        </button>
      </div>

      {/* 3D Scene */}
      <div className="flex-1">
        <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} />

          {/* Table */}
          <mesh position={[0, -2, 0]}>
            <boxGeometry args={[12, 0.4, 8]} />
            <meshStandardMaterial color="#ddd" />
          </mesh>

          {/* 🔥 Bunsen Burner */}
          <mesh position={[0, -1.8, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
            <meshStandardMaterial color="darkgray" />
          </mesh>
          <mesh position={[0.5, -1.5, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.8, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>

          {/* Flame */}
          {burnerOn && (
            <mesh position={[0, -0.3, 0]}>
              <coneGeometry args={[0.5, 1.5, 32]} />
              <meshStandardMaterial
                emissive={selectedSalt ? selectedSalt.color : "orange"}
                emissiveIntensity={3}
                color={selectedSalt ? selectedSalt.color : "orange"}
                transparent
                opacity={0.8}
              />
            </mesh>
          )}

          {/* 🧪 Beaker */}
          <mesh position={[-2, -1.1, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 1.2, 64]} />
            <meshStandardMaterial
              color="white"
              transparent
              opacity={0.2}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[-2, -1.4, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.6, 64]} />
            <meshStandardMaterial color="#a3c9f7" transparent opacity={0.7} />
          </mesh>

          {/* ✅ Platinum Wire */}
          {platinumPicked && (
            <a.mesh position={wirePos}>
              <cylinderGeometry args={[0.04, 0.04, 2]} />
              <meshStandardMaterial color="silver" />
            </a.mesh>
          )}

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
