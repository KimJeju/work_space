import * as THREE from 'three'

// import { DirectionalLight } from "three";

export default function InterectionTest(){

    function clickFunc(e:any){
        // console.log('click function e :', e)

        e.object.material.color = new THREE.Color('green');
    }

    function overFunc(e:any){
        console.log("mouse over");

        
        e.stopPropagation() //레이케스트 제한
        // e.object.scale.set(2,2,2);
        e.object.scale.x = 2;
    }

    function outFunc(e:any){
        console.log("mouse out");
        e.object.scale.set(1,1,1)
    }

    return(
        <>
            <ambientLight />
            <directionalLight intensity={5}/>

            <mesh 
                onClick={(e) => clickFunc(e)}
                onPointerOver={(e) => overFunc(e)}
                onPointerOut={(e) => outFunc(e)}

                position={[-2,0,0]}
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>

            <mesh 
                onClick={(e) => clickFunc(e)}
                onPointerOver={(e) => overFunc(e)}
                onPointerOut={(e) => outFunc(e)}

                position={[0,0,0]}
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>

            <mesh 
                onClick={(e) => clickFunc(e)}
                onPointerOver={(e) => overFunc(e)}
                onPointerOut={(e) => outFunc(e)}

                position={[2,0,0]}
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </>
    )
}