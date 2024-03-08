import * as THREE from 'three'
import { useThree } from '@react-three/fiber';
// import { DirectionalLight } from "three";

export default function InterectionTest() {

    // function clickFunc(e: any) {
    //     // console.log('click function e :', e)
    //     e.object.material.color = new THREE.Color('green');
    // }

    const {camera, scene, raycaster, pointer} = useThree()
 
    function overFunc(e: any) {
        console.log("mouse over");


        e.stopPropagation() //레이케스트 제한
        // e.object.scale.set(2,2,2);
        e.object.scale.x = 2;
    }

    function outFunc(e: any) {
        console.log("mouse out");
        e.object.scale.set(1, 1, 1)
    }

    function groupClickFunc(e:any){
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(e.eventObject, true);

        console.log(intersects);

        if(intersects.length > 0){
           const mesh =  intersects[0].object as any;

           mesh.material.color = new THREE.Color("red");

            console.log(" intersects[0] :" ,  intersects[0]);
        }
    }

    return (
        <>
            <ambientLight />
            <directionalLight intensity={5} />
            <group onClick={(e) => groupClickFunc(e)}>
                <mesh
                    // onClick={(e) => clickFunc(e)}
                    // onPointerOver={(e) => overFunc(e)}
                    // onPointerOut={(e) => outFunc(e)}

                    position={[-2, 0, 0]}
                >
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>

                <mesh
                    // onClick={(e) => clickFunc(e)}
                    // onPointerOver={(e) => overFunc(e)}
                    // onPointerOut={(e) => outFunc(e)}

                    position={[0, 0, 0]}
                >
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>

                <mesh
                    // onClick={(e) => clickFunc(e)}
                    // onPointerOver={(e) => overFunc(e)}
                    // onPointerOut={(e) => outFunc(e)}

                    position={[2, 0, 0]}
                >
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            </group>
        </>
    )
}