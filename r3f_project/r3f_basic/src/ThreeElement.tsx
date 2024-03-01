import * as Three from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react';

export default function ThreeElement(){

    const { size, gl, scene, camera } = useThree();

    // useRef 를 통해 box의 레퍼런스를 기억해둔다
    const boxRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {

        // gl 의 상태를 매 프레임마다 보여줌
        // console.log(state)

        // // 랜더링 된 사긴을 출력
        // console.log(delta)

        // console.log(boxRef)
        // boxRef.current.rotation.x += delta // 랜더링 시간 값을 더해서 뱅뱅 도는 효과를 줌
        // boxRef.current.position.y -= 0.01; // 0.01 만큼 매초다가 올라감
        // boxRef.current.scale.z += 0.01; // 가로로 늘어남
    })

    return(
        <>
            {/* 빛 관련 부분 */}
            <directionalLight position={[5,5,5]} />

             {/* 박스 메터리얼 */}
             {/* Three util을 사용해 회전값을 라디안 -> 디그리 변환 */}
            <mesh 
                ref={boxRef}
                rotation={
                [Three.MathUtils.degToRad(45),
                Three.MathUtils.degToRad(45),
                0]
            }>
                <boxGeometry />
                <meshStandardMaterial color="red"/>
            </mesh>
        </>
    )
}