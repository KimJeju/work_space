import './App.css'
import { Canvas } from '@react-three/fiber'
import LightTest from './LightTest'
import { OrbitControls } from '@react-three/drei'

// Three.js 단위  => 미터
function App() {


  return (
    <>
    <Canvas
      camera={{
        near:1,
        far:40,
        fov:75, 
        position :[5,5,5]
      }}
    >
      {/* color => 컨버스 색 변경 */}
      <color attach="background" args={["white"]} /> 
      <OrbitControls 
      />  
      <axesHelper args={[6]}/>
      <gridHelper args={[10, 10]} />
      <LightTest />
    </Canvas>
    </>
  )
}

export default App


// function App() {
//   return (
//     <>
//     {/* camera default => Perspective == 원근 ( 3D ) */}
//     <Canvas
//       // orthographic //2D를 사용하기 위한 프로퍼티 사전적의미 : 직각
//       camera={{
//         // zoom: 100, //orthographic 에서 카메라 위치 조정
//         near:1,
//         far:40,
//         fov:75, // orthographic 에는 fov가 없다 2d라서 각도가없음
//         position :[3,3,0]
//       }}
//     >
//       {/*  
//         '@react-three/drei' 라이브러리 기능들

//         OrbitControls : 카메라 회전 및 움직이기 기능
//         axesHelper : x(빨강),y(초록),z(파랑) 축 보여주기 기능 || args == 그리드 길이
//         gridHelper : 바닥에 그리드를 그려줌 || arge = [그리드크기, 그리드나누기, 그리드 센터 색깔, 전체 그리드 색깔 ]
//       */}

//       {/* 
//           Math.PI => 원주율 기본 180도
//           Math.PI * 2 = 360
//           Math.PI / 4 = 45
//        */}

//       <OrbitControls 
//         // minAzimuthAngle={-Math.PI / 4 } // -45도 // 왼쪽, 오른쪽 움직임 제한 
//         // maxAzimuthAngle={Math.PI / 4} // 45도
//         // minPolarAngle={Math.PI / 6} //Polar Angle 위, 아래 엔글 제한
//         // maxPolarAngle={Math.PI - Math.PI / 6}
//       />  
//       <axesHelper args={[5]}/>
//       <gridHelper args={[5, 5, "red", 'teal']} />
//       <ThreeElement />
//     </Canvas>
//     </>
//   )
// }

// export default App
