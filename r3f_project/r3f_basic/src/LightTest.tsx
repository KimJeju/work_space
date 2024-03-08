import * as THREE from 'three'
import { useFrame, } from '@react-three/fiber'
import { useEffect, useRef } from 'react';
import { useTexture, useHelper, Environment } from '@react-three/drei';


export default function LightTest() {


    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);


    const matcap = useTexture('./imgs/matcap1.jpg')  //맥캡 텍스쳐 이미지 가져오기
    const dLight = useRef<THREE.DirectionalLight>(null!);
    useHelper(dLight, THREE.DirectionalLightHelper)

    const sLight = useRef<THREE.SpotLight>(null!);
    useHelper(sLight, THREE.SpotLightHelper)

    useFrame((state, delta) => {
      
    })

    useEffect(() => {

        //그룹 데터리얼 공유 및 칸이동
        const meshLength = groupRef.current!.children.length;
        for(let i = 0; i < groupRef.current!.children.length; ++i){
            const mesh =  groupRef.current!.children[i] as THREE.Mesh;
            mesh.geometry = meshRef.current!.geometry;
            mesh.position.x= i % (meshLength/2) * 2 - 4 ; //앞뒤열 mesh 곂침
            if(i >= meshLength/2){
                mesh.position.z = 2;
            }
        }
    }, [])


    return (
        <>
            {/* 빛 관련 부분 */}
            {/* <directionalLight position={[5, 5, 5]} intensity={5} /> */}
            {/* <fog attach={"fog"} args={["blue", 3,10]} />  안개*/}

            {/* 주변광, 간접광 */}
            {/* <ambientLight color={'#fff'} intensity={1}/>  */}

            {/* args => 위쪽 빛, 아래쪽 빛, 강도 
             주변광, 간접광 ( 색 2개 )
             돔라이트 ( 하늘색깔조명, 바닥 색깔 조명 )
            */}
            {/* <hemisphereLight args={["blue", "yellow", 2]}/> */}
            
            {/* 햇빛 ( 방향성이 있는 빛 ) */}
            <directionalLight 
                castShadow // 그림자 속성
                ref={dLight}
                color={'#fff'} 
                position={[5,5,-5]} // 빛의 위치
                intensity={5} 
                target-position={[2,0,0]} //빛을 비추는 방향
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
                shadow-camera-right={10}

                shadow-mapSize = {[512,512]} //그림자 뚜렷도
                />
            

            {/* 가운데 부터 퍼지는 빛
            <pointLight 
                color={'#fff'} 
                position={[0,0,2]} // 빛의 위치
                intensity={5}  //강도 
                distance={5} //거리
            /> */}

            {/* <spotLight 
                ref={sLight}
                color={'#fff'} 
                position={[0,5,0]} // 빛의 위치
                intensity={300}  //강도 
                distance={300} //거리
                angle={THREE.MathUtils.degToRad(40)} //빛을 비추는 강도
                penumbra={0.5} // 빛의 가장 자리가 비추는 정도 0 ~ 1
            /> */}

            {/* <Environment
                files={'./imgs/hdr1.hdr'}
                background
                blur={0}
            /> */}
        
            <mesh 
                rotation-x={THREE.MathUtils.degToRad(-90)}
                position-y={-1}
                receiveShadow // 바닥에 그림자 추가
                >
                <planeGeometry args={[15,15]} />
                <meshStandardMaterial color={'blue'} side={THREE.DoubleSide} />
            </mesh>

            <mesh
                ref={meshRef}
                position={[0, 0, 0]}
            >
                <torusKnotGeometry args={[0.5,0.2]} />

                {/* 빛의 영향을 받지 않는 메테리얼 */}
                <meshBasicMaterial  visible={false}/>
            </mesh>

            <group ref={groupRef}>

          

                <mesh
                    castShadow //나에 매쉬에 그림자 생성
                    receiveShadow // 내 뒷쪽에 매쉬도 그림자 적용
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
                   castShadow //나에 매쉬에 그림자 생성
                   receiveShadow // 내 뒷쪽에 매쉬도 그림자 적용
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

                <mesh
                   castShadow //나에 매쉬에 그림자 생성
                   receiveShadow // 내 뒷쪽에 매쉬도 그림자 적용
                >
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

                <mesh
                    castShadow
                    receiveShadow
                >
                    <meshPhysicalMaterial 
                        color="#fff"
                        visible={true}
                        transparent={true}
                        opacity={1}
                        side={THREE.FrontSide}
                        alphaTest={1}
                        depthTest={true}
                        depthWrite={true}
                        fog={true}

                        emissive={'black'}
                        roughness={0}
                        metalness={0}
                        clearcoat={0}
                        clearcoatRoughness={0}

                        transmission={1}
                        thickness={0.5}
                        ior={2.33}
                        // flatShading={true}
                    />
                </mesh>

                <mesh
                   castShadow //나에 매쉬에 그림자 생성
                   receiveShadow // 내 뒷쪽에 매쉬도 그림자 적용
                >
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

