import * as Three from 'three'


export default function ThreeElement(){

    return(
        <>
            {/* 빛 관련 부분 */}
            <directionalLight position={[5,5,5]} />

             {/* 박스 메터리얼 */}
             {/* Three util을 사용해 회전값을 라디안 -> 디그리 변환 */}
            <mesh rotation={
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