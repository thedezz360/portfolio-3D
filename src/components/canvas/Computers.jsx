/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import React, { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";



function Computer({isMobile}) {
	const { scene } = useGLTF("./desktop_pc/scene.gltf");
	console.log(isMobile);
	return (
		<mesh>
			<hemisphereLight intensity={0.15} groundColor="black" />

			<pointLight intensity={1} />

			<spotLight 
				position={[10,30, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>

			<primitive
				object={scene}
				scale={isMobile ? 0.5 : 0.80}
				position={isMobile ? [-1, -2.40, -1.5] : [1, -2, -1.5]}
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
}

const ComputersCanvas = () => {

	const [isMobile, setIsMobile] = useState(false);

	useEffect(()=>{

		//add a listener for changes to the screen
		const mediaQuery = window.matchMedia("(max-width:900px)");

		//set true if we are in mobile(screen 500px or lower)
		setIsMobile(mediaQuery.matches);

		//define a callback function to handle changes to the media query
		const handleMediaQueryChange = (event) =>{
			setIsMobile(event.matches);
		};

		//add the callback function as a listener for changes to the media query
		mediaQuery.addEventListener("chage",handleMediaQueryChange);

		//remove the listener when the component is unmounted
		return () =>{
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	

	},[]);

	return (
		<div className="canvas-container h-[50vh]">
			<Canvas
				frameloop="demand"
				shadows
				camera={{ position: [20, 3, 5], fov: 25 }}
				gl={{ preserveDrawingBuffer: true }}
			>
				<Suspense fallback={<CanvasLoader />}>
					<OrbitControls
						enableZoom={false}
						maxPolarAngle={Math.PI / 2}
						minPolarAngle={Math.PI / 2}
					/>

					<Computer isMobile={isMobile} />
				</Suspense>

				<Preload all />
			</Canvas>
		</div>
	);
};

// 	);
// };

export default ComputersCanvas;
