// src/hooks/scenes/useThreeScene.js
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export const useThreeScene = (containerRef, setupCallback, deps = []) => {
    const sceneObjectsRef = useRef({}); // Stores scene, camera, renderer, controls, cleanupFn 

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Basic Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // 2. Scene-Specific Initialization via Callback
        // The callback returns the animation frame ID and resources to dispose
        const { cleanupResources, controls, frameId, animate } = setupCallback({ scene, camera, renderer, container });

        // Store references for cleanup and potential updates
        sceneObjectsRef.current = { scene, renderer, cleanupResources, controls, frameId };

        // 3. Resize Handler
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // 4. Start Animation Loop
        const initialFrameId = animate();
        sceneObjectsRef.current.frameId = initialFrameId;


        // Cleanup function executes on unmount or dependency change [12]
        return () => {
            // A. Stop Animation
            cancelAnimationFrame(sceneObjectsRef.current.frameId);
            
            // B. Dispose Renderer and remove DOM element
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();

            // C. Dispose Resources (Geometry and Materials)
            cleanupResources.forEach(resource => {
                if (resource.dispose) resource.dispose();
            });
            
            // D. Remove Controls/Listeners
            if (sceneObjectsRef.current.controls && sceneObjectsRef.current.controls.dispose) {
                sceneObjectsRef.current.controls.dispose();
            }
            window.removeEventListener('resize', handleResize);
        };
    },); // Deps array ensures re-run on theme change

    // Return the current scene objects for external interaction (if needed)
    return sceneObjectsRef.current;
};