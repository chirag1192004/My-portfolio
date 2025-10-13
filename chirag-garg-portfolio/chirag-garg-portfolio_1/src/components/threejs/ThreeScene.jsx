import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // FIX: Added .js extension

const ThreeScene = ({ containerId, terminalContentRef, meshRef }) => {
    const mountRef = useRef(null);

    const initScene = useCallback(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // --- Standard Three.js Setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        camera.position.set(0, 0, 5);

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(5, 10, 5).normalize();
        scene.add(directionalLight);

        // --- 3D Monitor Model (Simplified Shell) ---
        const monitorGroup = new THREE.Group();
        
        // Monitor Body (Cube)
        const bodyGeometry = new THREE.BoxGeometry(6, 4.5, 3);
        const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: 0x0a0d14, metalness: 0.8, roughness: 0.2 });
        const monitorBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
        monitorGroup.add(monitorBody);

        // Screen Plane 
        const screenGeometry = new THREE.PlaneGeometry(5, 3.5);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const screenPlane = new THREE.Mesh(screenGeometry, screenMaterial);
        screenPlane.position.set(0, 0, 1.51); 
        monitorGroup.add(screenPlane);

        // Monitor Base 
        const baseGeometry = new THREE.CylinderGeometry(1.5, 2.5, 0.5, 32);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x0d1117 });
        const monitorBase = new THREE.Mesh(baseGeometry, baseMaterial);
        monitorBase.position.set(0, -2.5, 0);
        monitorGroup.add(monitorBase);

        scene.add(monitorGroup);
        if (meshRef) meshRef.current = monitorGroup;
        
        // --- Orbit Controls ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = false;
        controls.enablePan = false;
        
        // --- Animation Loop ---
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // --- Resize Handler ---
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, [terminalContentRef, meshRef]);

    useEffect(() => {
        initScene();
    }, [initScene]);

    // The component that mounts the Three.js scene
    return (
        <div id={containerId} ref={mountRef} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
            {/* The CRT overlay element is passed as a ref but rendered here 
                to ensure it's part of the DOM for easy styling and content injection. */}
            <div id="crt-overlay" ref={terminalContentRef} className="crt-scanlines" style={{ opacity: 1, pointerEvents: 'auto' }}>
                <div id="crt-output" className="crt-output"></div>
                <div id="crt-input-container" className="crt-input-container">
                    <span id="crt-prompt">User: ~$</span>
                    <input type="text" id="crt-input" className="crt-input" autoFocus />
                </div>
            </div>
        </div>
    );
};

export default ThreeScene;
