import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect} from 'react';
import { useControls } from 'leva';

export default function ThreeElement() {

    const { size, gl, scene, camera } = useThree();

    // useRef 를 통해 box의 레퍼런스를 기억해둔다
    const boxRef = useRef<THREE.Mesh>(null);
    const boxCopyRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const boxControl = useControls({
        width : { value:1, min:0.1, max:10, step:0.1},
        height :{ value:1, min:0.1, max:10, step:0.1},
        depth :{ value:1, min:0.1, max:10, step:0.1},
        widthSeg :{ value:1, min:1, max:10, step:1},
        heightSeg :{ value:1, min:1, max:10, step:1},
        depthSeg :{ value:1, min:1, max:10, step:1},
    })

    //박스 돌리기
    // const box = useControls({
    //     retation : {value : 0, min: -360, max:360, step:1}
    // })


    // 옛날 3GS에서 사용하던 mesh 추가법
    // const geometry = new Three.BoxGeometry(1,1,1);
    // const metarial = new Three.MeshBasicMaterial({ color : 0x00ff00 });
    // const cube = new Three.Mesh( geometry, metarial);
    // scene.add(cube)

    useFrame((state, delta) => {

        // gl 의 상태를 매 프레임마다 보여줌
        // console.log(state)

        // // 랜더링 된 사긴을 출력
        // console.log(delta)

        // console.log(boxRef)
        // boxRef.current.position.x += 0.01 // 랜더링 시간 값을 더해서 뱅뱅 도는 효과를 줌
        // boxRef.current.rotation.x -= 0.01; // 0.01 만큼 매초다가 올라감
        // boxRef.current.scale.x += 0.01; // 가로로 늘어남

        // scene.position.x += 0.01

        // groupRef.current.rotation.x += delta;
    })

    // 최상위 월드 => scene
    // scene.rotation.x =  THREE.MathUtils.degToRad(45)

    useEffect(() => {
        boxCopyRef.current.geometry = boxRef.current.geometry
    }, [boxControl])


    return (
        <>
            {/* 빛 관련 부분 */}
            <directionalLight position={[5, 5, 5]} />

            {/* 박스 메터리얼 */}
            {/* Three util을 사용해 회전값을 라디안 -> 디그리 변환 */}
            {/*
                mesh : geometry 와 metarial 이 합쳐진 구현체 
                mesh 의 구성요소 
                - geometry : 구성요소의 모양 
                - metarial : 구성요소의 색깔

             */}

              {/* 지오메트리를 불러오는 세가지 방법
              1. drei  사용
                <Box position={[-2,0,0]}>
                    <meshStandardMaterial color="green" />
                </Box>

               2. 파라미터로 지정
                <mesh geometry={new THREE.BoxGeometry(1,1,1)}>
                    <meshStandardMaterial color="blue"/>
                </mesh>

                3. mesh 안에 선언
                  <mesh
                    ref={boxRef}
                    position={[2, 0, 0]} // mesh 위치변경 x,y,z
                    // position-x={[5]} 축 하나씩 이동
                    // scale={[1, 1, 1]} //크기변경 x,y,z
                    // rotation={[
                    //     THREE.MathUtils.degToRad(0),
                    //     THREE.MathUtils.degToRad(0),
                    //     THREE.MathUtils.degToRad(0),
                    // ]}
                >
                    <boxGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
                 */}


                {/* 와이어프레임 생성 */}
                <mesh
                    ref={boxRef}
                    position={[0, 0, 0]} // mesh 위치변경 x,y,z
                    // position-x={[5]} 축 하나씩 이동
                    // scale={[1, 1, 1]} //크기변경 x,y,z
                    // rotation={[
                    //     THREE.MathUtils.degToRad(0),
                    //     THREE.MathUtils.degToRad(0),
                    //     THREE.MathUtils.degToRad(0),
                    // ]}
                >
                    <boxGeometry args={[
                        boxControl.width, 
                        boxControl.height,
                        boxControl.depth,
                        boxControl.widthSeg,
                        boxControl.heightSeg,
                        boxControl.depthSeg
                        ]}/>
                    <meshStandardMaterial wireframe/>
                </mesh>

                <mesh
                    ref={boxCopyRef}
                >
                    <meshStandardMaterial color="red" />
                </mesh>
        </>
    )
}