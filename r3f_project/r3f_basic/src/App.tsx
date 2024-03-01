import './App.css'
import { Canvas } from '@react-three/fiber'
import ThreeElement from './ThreeElement'

function App() {


  return (
    <>
    {/* camera default => Perspective == 원근 ( 3D ) */}
    <Canvas
      // orthographic //2D를 사용하기 위한 프로퍼티 사전적의미 : 직각
      camera={{
        // zoom: 100, //orthographic 에서 카메라 위치 조정
        near:1,
        far:20,
        fov:75, // orthographic 에는 fov가 없다 2d라서 각도가없음
        position :[3,3,0]
      }}
    >
      <ThreeElement />
    </Canvas>
    </>
  )
}

export default App
