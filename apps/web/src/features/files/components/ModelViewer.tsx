import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Bounds,
    Center,
} from "@react-three/drei";

import {
    STLLoader,
    GLTFLoader,
    OBJLoader,
} from "three-stdlib";

import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { converter } from "culori";

import type { FileComponentProps } from "@/pages/dashboard/FilePage";
import { oklchToHex } from "@/lib/helpers";


function Model({
    url,
    extension,
}: {
    url: string;
    extension: string;
}) {

    const color = oklchToHex("oklch(0.862 0.174 92.45)");
        console.log("ModelViewer: rgb", color, { url, extension });


    if (extension === "stl") {
        const geometry = useLoader(
            STLLoader,
            url
        );

        return (
            <mesh geometry={geometry}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>
        );
    }


    if (
        extension === "glb" ||
        extension === "gltf"
    ) {
        const model = useLoader(
            GLTFLoader,
            url
        );

        return (
            <primitive object={model.scene} />
        );
    }


    if (extension === "obj") {
        const model = useLoader(
            OBJLoader,
            url
        );

        return (
            <primitive object={model} />
        );
    }


    return null;
}


export function ModelViewer({
    fileContent,
}: FileComponentProps) {

    if (!fileContent) {
        return null;
    }


    return (
        <div className="h-[600px] w-full overflow-hidden rounded-lg border">

            <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 45,
                }}
            >

                <ambientLight intensity={1} />

                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2}
                />


                <Suspense fallback={null}>

                    <Bounds
                        fit
                        clip
                        observe
                        margin={1.2}
                    >

                        <Center>
                            <Model
                                url={fileContent.url}
                                extension={fileContent.extension}
                            />
                        </Center>

                    </Bounds>

                </Suspense>


                <OrbitControls />

            </Canvas>

        </div>
    );
}