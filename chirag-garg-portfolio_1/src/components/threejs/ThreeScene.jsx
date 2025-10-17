import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = ({ sceneName, containerId, style, heroControlsRef, heroMeshRef }) => {
    const mountRef = useRef(null);
    const sceneRefs = useRef({});

    const initScene = useCallback(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Cleanup previous scene to avoid memory leaks/re-renders
        if (sceneRefs.current.renderer) {
            currentMount.removeChild(sceneRefs.current.renderer.domElement);
            sceneRefs.current = {};
        }

        // Scene, Camera, Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        let controls;
        const animationObjects = [];

        // --- Scene-specific setups ---
        switch (sceneName) {
            case 'hero':
                camera.position.z = 5;
                controls = new OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.5;
                controls.enableZoom = false;
                controls.enablePan = false;
                if (heroControlsRef) heroControlsRef.current = controls;

                const ambientLightHero = new THREE.AmbientLight(0xffffff, 0.3);
                scene.add(ambientLightHero);
                const dirLightHero = new THREE.DirectionalLight(0xffffff, 1.5);
                dirLightHero.position.set(5, 5, 5).normalize();
                scene.add(dirLightHero);

                const geometry = new THREE.TorusKnotGeometry(1, 0.4, 128, 16);
                const material = new THREE.MeshPhysicalMaterial({ color: 0x3b82f6, metalness: 0.8, roughness: 0.2 });
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                if (heroMeshRef) heroMeshRef.current = mesh;
                animationObjects.push({ type: 'controls', obj: controls });
                break;

            case 'pc':
                camera.position.z = 3;
                camera.position.y = 0.5;
                controls = new OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.enableZoom = false;
                
                const ambientLightPC = new THREE.AmbientLight(0xffffff, 0.4);
                scene.add(ambientLightPC);
                const spotLightPC = new THREE.SpotLight(0x00ff00, 1.5);
                spotLightPC.position.set(2, 5, 2);
                scene.add(spotLightPC);

                const caseGeo = new THREE.BoxGeometry(1, 2, 2);
                const caseMat = new THREE.MeshPhysicalMaterial({ color: 0x374151, metalness: 0.5, roughness: 0.5 });
                const caseMesh = new THREE.Mesh(caseGeo, caseMat);
                caseMesh.position.y = 0.5;
                scene.add(caseMesh);
                
                const lightGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.05);
                const lightMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                const lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
                lightMesh.position.set(0.5, 1.5, -0.9);
                scene.add(lightMesh);
                
                animationObjects.push({ type: 'controls', obj: controls });
                animationObjects.push({ type: 'pc_light', obj: lightMesh });
                break;
            
            case 'data':
                 camera.position.z = 10;
                 camera.position.y = 2;
                 const bars = [];
                 const barCount = 10;
                 const spacing = 1;
                 const startX = -(barCount * spacing) / 2 + spacing / 2;
                 
                 const ambientLightData = new THREE.AmbientLight(0xffffff, 0.2);
                 scene.add(ambientLightData);

                 for (let i = 0; i < barCount; i++) {
                     const height = 1 + Math.random() * 5;
                     const geo = new THREE.BoxGeometry(0.5, height, 0.5);
                     const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(`hsl(${(i * 30 + 200) % 360}, 90%, 60%)`), emissive: 0x0a0a0a });
                     const bar = new THREE.Mesh(geo, mat);
                     bar.position.set(startX + i * spacing, height / 2, 0);
                     scene.add(bar);
                     bars.push(bar);
                 }
                 animationObjects.push({type: 'data_bars', obj: bars});
                 break;

            case 'contact':
                camera.position.z = 5;
                const particlesGeo = new THREE.BufferGeometry();
                const count = 500;
                const positions = new Float32Array(count * 3);
                for (let i = 0; i < count * 3; i++) {
                    positions[i] = (Math.random() - 0.5) * 10;
                }
                particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                const particlesMat = new THREE.PointsMaterial({ size: 0.02, color: 0x60a5fa, transparent: true, opacity: 0.4 });
                const particles = new THREE.Points(particlesGeo, particlesMat);
                scene.add(particles);
                animationObjects.push({ type: 'particles', obj: particles });
                break;

            default:
                break;
        }

        sceneRefs.current = { renderer, camera, currentMount, animationObjects };
        
        // Animation Loop
        const animate = () => {
            if (!sceneRefs.current.renderer) return;

            sceneRefs.current.animationObjects.forEach(item => {
                if (item.type === 'controls' && item.obj.update) item.obj.update();
                if (item.type === 'particles') item.obj.rotation.y += 0.0001;
                if (item.type === 'data_bars') {
                    item.obj.forEach((bar, index) => {
                        bar.scale.y = 1 + Math.sin(Date.now() * 0.0005 + index) * 0.15;
                        bar.position.y = bar.geometry.parameters.height * bar.scale.y / 2;
                    });
                }
                if (item.type === 'pc_light') {
                     item.obj.material.color.set(Math.random() > 0.98 ? 0xff0000 : 0x00ff00);
                }
            });
            sceneRefs.current.renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            if (sceneRefs.current.currentMount) {
                camera.aspect = sceneRefs.current.currentMount.clientWidth / sceneRefs.current.currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(sceneRefs.current.currentMount.clientWidth, sceneRefs.current.currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            // Dispose Three.js objects to prevent memory leaks
            if (sceneRefs.current.renderer) {
                sceneRefs.current.renderer.dispose();
            }
        };
    }, [sceneName, containerId, heroControlsRef, heroMeshRef]);
    
    useEffect(() => {
      initScene();
    }, [initScene]);

    return <div id={containerId} ref={mountRef} className="three-container" style={style}></div>;
};

export default ThreeScene;
