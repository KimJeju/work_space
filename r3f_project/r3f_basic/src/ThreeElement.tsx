import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react';
import { useControls } from 'leva'
import { useTexture } from '@react-three/drei';


export default function ThreeElement() {


    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);


    const controls = useControls({
        thinkness:{value : 0.1, min:0.1, max:10, step:0.1}
    })

    const matcap = useTexture('./imgs/matcap1.jpg')  //맥캡 텍스쳐 이미지 가져오기

    useFrame((state, delta) => {
      
    })

    useEffect(() => {

        //그룹 데터리얼 공유 및 칸이동
        const meshLength = groupRef.current!.children.length;
        for(let i = 0; i < groupRef.current!.children.length; ++i){
            const mesh =  groupRef.current!.children[i] as THREE.Mesh;
            mesh.geometry = meshRef.current!.geometry;
            mesh.position.x= i % (meshLength/2) * 2 - 4; //앞뒤열 mesh 곂침
            if(i >= meshLength/2){
                mesh.position.z = 2;
            }
        }
    }, [])


    return (
        <>
            {/* 빛 관련 부분 */}
            <directionalLight position={[5, 5, 5]} intensity={5} />
            {/* <fog attach={"fog"} args={["blue", 3,10]} />  안개*/}
            <mesh
                ref={meshRef}
                position={[0, 0, 0]}
            >
                <torusKnotGeometry args={[0.5,0.2]} />

                {/* 빛의 영향을 받지 않는 메테리얼 */}
                <meshBasicMaterial  visible={false}/>
            </mesh>

            <group ref={groupRef}>

                <mesh>
                    <meshBasicMaterial
                        wireframe
                        color="green"
                    />
                </mesh>

                <mesh>
                    <meshBasicMaterial
                        color="red"
                        visible={true}
                        transparent={false}
                        opacity={1}
                        side={THREE.DoubleSide}
                        alphaTest={1}
                        depthTest={true}
                        depthWrite={false}
                        fog={false}
                    />
                </mesh>

                <mesh
                >
                    <meshLambertMaterial
                        color="red"
                        visible={true}
                        transparent={false}
                        opacity={1}
                        side={THREE.DoubleSide}
                        alphaTest={1}
                        depthTest={true}
                        depthWrite={false}
                        fog={false}

                        emissive={"black"}
                    />
                </mesh>


                <mesh
                >
                    <meshPhongMaterial 
                        color="red"
                        visible={true}
                        transparent={false}
                        opacity={1}
                        side={THREE.DoubleSide}
                        alphaTest={1}
                        depthTest={true}
                        depthWrite={false}
                        fog={false}


                        emissive={"black"}

                        specular={'#fff'}
                        shininess={100}
                        flatShading={false}
                    />
                </mesh>


                <mesh>
                    <meshNormalMaterial />
                </mesh>

                <mesh>
                    {/* 금속성 */}
                    <meshStandardMaterial 
                         color="red"
                         visible={true}
                         transparent={false}
                         opacity={1}
                         side={THREE.DoubleSide}
                         alphaTest={1}
                         depthTest={true}
                         depthWrite={false}
                         fog={false}

                         emissive={"black"}

                         roughness={1} //거칠기
                         metalness={5} //금속성
                        //  flatShading={false}
                    />
                </mesh>

                <mesh>
                    <meshPhysicalMaterial 
                         color="#fff"
                         visible={true}
                         transparent={true}
                         opacity={1}
                         side={THREE.DoubleSide}
                         alphaTest={1}
                         depthTest={true}
                         depthWrite={true}
                         fog={true}

                         emissive={"black"}

                         roughness={1} //거칠기
                         metalness={0} //금속성
                         clearcoat={5} //표면 코팅
                         clearcoatRoughness={5} // 코팅 거칠기
                        //  flatShading={false}

                        transmission={1}
                        thickness={controls.thinkness}
                        ior={2.33}
                    />
                </mesh>

                <mesh>
                    <meshDepthMaterial />
                </mesh>

                <mesh>
                    <meshMatcapMaterial
                     matcap={matcap} 
                     flatShading={false}
                     />
                </mesh>

                <mesh>
                    <meshToonMaterial

                    />
                </mesh>
            </group>

        </>
    )
}


//써클
// export default function ThreeElement() {

//     // useRef 를 통해 box의 레퍼런스를 기억해둔다
//     const boxRef = useRef<THREE.Mesh>(null);
//     const boxCopyRef = useRef<THREE.Mesh>(null);
//     const boxControl = useControls({
//         radius : { value:1, min:0.1, max:10, step:0.1},
//         segments :{ value:32, min:1, max:100, step:1},
//         thetaStart :{ value:0, min:0, max:360, step:0.1},
//         thetaLength :{ value:360, min:0, max:360, step:0.1},
//     })

//     useEffect(() => {
//         boxCopyRef.current.geometry = boxRef.current.geometry
//     }, [boxControl])


//     return (
//         <>
//             {/* 빛 관련 부분 */}
//             <directionalLight position={[5, 5, 5]} />
//                 <mesh
//                     ref={boxRef}
//                     position={[0, 0, 0]} // mesh 위치변경 x,y,z
//                     // position-x={[5]} 축 하나씩 이동
//                     // scale={[1, 1, 1]} //크기변경 x,y,z
//                     // rotation={[
//                     //     THREE.MathUtils.degToRad(0),
//                     //     THREE.MathUtils.degToRad(0),
//                     //     THREE.MathUtils.degToRad(0),
//                     // ]}
//                 >
//                     <circleGeometry args={[
//                         boxControl.radius,
//                         boxControl.segments,
//                         THREE.MathUtils.degToRad(boxControl.thetaStart),
//                         THREE.MathUtils.degToRad(boxControl.thetaLength)
//                         ]}/>
//                     <meshStandardMaterial wireframe/>
//                 </mesh>

//                 <mesh
//                     ref={boxCopyRef}
//                 >
//                     <meshStandardMaterial color="red" />
//                 </mesh>
//         </>
//     )
// }

// 박스
// export default function ThreeElement() {

//     const { size, gl, scene, camera } = useThree();

//     // useRef 를 통해 box의 레퍼런스를 기억해둔다
//     const boxRef = useRef<THREE.Mesh>(null);
//     const boxCopyRef = useRef<THREE.Mesh>(null);
//     const groupRef = useRef<THREE.Group>(null);
//     const boxControl = useControls({
//         width : { value:1, min:0.1, max:10, step:0.1},
//         height :{ value:1, min:0.1, max:10, step:0.1},
//         depth :{ value:1, min:0.1, max:10, step:0.1},
//         widthSeg :{ value:1, min:1, max:10, step:1},
//         heightSeg :{ value:1, min:1, max:10, step:1},
//         depthSeg :{ value:1, min:1, max:10, step:1},
//     })

//     //박스 돌리기
//     // const box = useControls({
//     //     retation : {value : 0, min: -360, max:360, step:1}
//     // })


//     // 옛날 3GS에서 사용하던 mesh 추가법
//     // const geometry = new Three.BoxGeometry(1,1,1);
//     // const metarial = new Three.MeshBasicMaterial({ color : 0x00ff00 });
//     // const cube = new Three.Mesh( geometry, metarial);
//     // scene.add(cube)

//     useFrame((state, delta) => {

//         // gl 의 상태를 매 프레임마다 보여줌
//         // console.log(state)

//         // // 랜더링 된 사긴을 출력
//         // console.log(delta)

//         // console.log(boxRef)
//         // boxRef.current.position.x += 0.01 // 랜더링 시간 값을 더해서 뱅뱅 도는 효과를 줌
//         // boxRef.current.rotation.x -= 0.01; // 0.01 만큼 매초다가 올라감
//         // boxRef.current.scale.x += 0.01; // 가로로 늘어남

//         // scene.position.x += 0.01

//         // groupRef.current.rotation.x += delta;
//     })

//     // 최상위 월드 => scene
//     // scene.rotation.x =  THREE.MathUtils.degToRad(45)

//     useEffect(() => {
//         boxCopyRef.current.geometry = boxRef.current.geometry
//     }, [boxControl])


//     return (
//         <>
//             {/* 빛 관련 부분 */}
//             <directionalLight position={[5, 5, 5]} />

//             {/* 박스 메터리얼 */}
//             {/* Three util을 사용해 회전값을 라디안 -> 디그리 변환 */}
//             {/*
//                 mesh : geometry 와 metarial 이 합쳐진 구현체 
//                 mesh 의 구성요소 
//                 - geometry : 구성요소의 모양 
//                 - metarial : 구성요소의 색깔

//              */}

//               {/* 지오메트리를 불러오는 세가지 방법
//               1. drei  사용
//                 <Box position={[-2,0,0]}>
//                     <meshStandardMaterial color="green" />
//                 </Box>

//                2. 파라미터로 지정
//                 <mesh geometry={new THREE.BoxGeometry(1,1,1)}>
//                     <meshStandardMaterial color="blue"/>
//                 </mesh>

//                 3. mesh 안에 선언
//                   <mesh
//                     ref={boxRef}
//                     position={[2, 0, 0]} // mesh 위치변경 x,y,z
//                     // position-x={[5]} 축 하나씩 이동
//                     // scale={[1, 1, 1]} //크기변경 x,y,z
//                     // rotation={[
//                     //     THREE.MathUtils.degToRad(0),
//                     //     THREE.MathUtils.degToRad(0),
//                     //     THREE.MathUtils.degToRad(0),
//                     // ]}
//                 >
//                     <boxGeometry />
//                     <meshStandardMaterial color="red" />
//                 </mesh>
//                  */}


//                 {/* 와이어프레임 생성 */}
//                 <mesh
//                     ref={boxRef}
//                     position={[0, 0, 0]} // mesh 위치변경 x,y,z
//                     // position-x={[5]} 축 하나씩 이동
//                     // scale={[1, 1, 1]} //크기변경 x,y,z
//                     // rotation={[
//                     //     THREE.MathUtils.degToRad(0),
//                     //     THREE.MathUtils.degToRad(0),
//                     //     THREE.MathUtils.degToRad(0),
//                     // ]}
//                 >
//                     <boxGeometry args={[
//                         boxControl.width, 
//                         boxControl.height,
//                         boxControl.depth,
//                         boxControl.widthSeg,
//                         boxControl.heightSeg,
//                         boxControl.depthSeg
//                         ]}/>
//                     <meshStandardMaterial wireframe/>
//                 </mesh>

//                 <mesh
//                     ref={boxCopyRef}
//                 >
//                     <meshStandardMaterial color="red" />
//                 </mesh>
//         </>
//     )
// }

