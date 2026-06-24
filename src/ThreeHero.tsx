import { useEffect, useRef } from "react";
import * as THREE from "three";

type Node = {
  mesh: THREE.Mesh;
  origin: THREE.Vector3;
  velocity: THREE.Vector3;
};

export function ThreeHero() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0.5, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    mount.appendChild(renderer.domElement);

    const pointer = new THREE.Vector2(0, 0);
    const group = new THREE.Group();
    scene.add(group);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.09, 1);
    const largeNodeGeometry = new THREE.OctahedronGeometry(0.18, 0);
    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x42d9c8,
        roughness: 0.38,
        metalness: 0.2,
        emissive: 0x0d615a,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xf5b849,
        roughness: 0.42,
        metalness: 0.15,
        emissive: 0x553e0b,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xf06449,
        roughness: 0.5,
        metalness: 0.08,
        emissive: 0x4d1f14,
      }),
    ];

    const nodes: Node[] = [];
    const count = 76;

    for (let index = 0; index < count; index += 1) {
      const radius = 2.2 + Math.random() * 4.2;
      const angle = (index / count) * Math.PI * 2;
      const layer = (index % 7) - 3;
      const mesh = new THREE.Mesh(
        index % 11 === 0 ? largeNodeGeometry : nodeGeometry,
        materials[index % materials.length],
      );
      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 0.9,
        layer * 0.42 + (Math.random() - 0.5) * 0.8,
        Math.sin(angle) * radius * 0.52 + (Math.random() - 0.5) * 1.6,
      );
      const origin = mesh.position.clone();
      nodes.push({
        mesh,
        origin,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
        ),
      });
      group.add(mesh);
    }

    const linePositions = new Float32Array(count * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc8fff6,
      transparent: true,
      opacity: 0.22,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    const coreGeometry = new THREE.TorusKnotGeometry(1.1, 0.035, 180, 12, 2, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.5,
      emissive: 0x123c39,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xf06449, 18, 24);
    rimLight.position.set(-5, -2, 4);
    scene.add(rimLight);

    const handlePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
    };

    renderer.domElement.addEventListener("pointermove", handlePointer);
    window.addEventListener("resize", handleResize);
    handleResize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.055 + pointer.x * 0.16;
      group.rotation.x = -0.12 + pointer.y * 0.08;
      core.rotation.x = elapsed * 0.32;
      core.rotation.y = elapsed * 0.45;

      nodes.forEach((node, index) => {
        const pulse = Math.sin(elapsed * 0.9 + index * 0.6) * 0.1;
        node.mesh.position.x = node.origin.x + node.velocity.x * elapsed * 18;
        node.mesh.position.y = node.origin.y + pulse + node.velocity.y * elapsed * 12;
        node.mesh.position.z = node.origin.z + node.velocity.z * elapsed * 14;
        node.mesh.rotation.x += 0.004 + index * 0.00002;
        node.mesh.rotation.y += 0.006;
      });

      let offset = 0;
      for (let index = 0; index < count; index += 1) {
        const current = nodes[index].mesh.position;
        const next = nodes[(index + 7) % count].mesh.position;
        linePositions[offset] = current.x;
        linePositions[offset + 1] = current.y;
        linePositions[offset + 2] = current.z;
        linePositions[offset + 3] = next.x;
        linePositions[offset + 4] = next.y;
        linePositions[offset + 5] = next.z;
        offset += 6;
      }
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", handlePointer);
      mount.removeChild(renderer.domElement);

      nodeGeometry.dispose();
      largeNodeGeometry.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return <div className="three-hero" ref={mountRef} aria-hidden="true" />;
}
