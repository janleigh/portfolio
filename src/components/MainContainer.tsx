import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as THREE from "three";

// Separated to make maintaining of 3D background easier
function MainContainer() {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = mountRef.current;
		if (!container) return;

		let width = container.clientWidth;
		let height = container.clientHeight;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio || 1);
		container.appendChild(renderer.domElement);

		// --- LIGHTING ---
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const pointLight = new THREE.PointLight(0x6791c9, 2);
		pointLight.position.set(5, 5, 5);
		scene.add(pointLight);

		// --- OBJECTS ---
		const group = new THREE.Group();
		scene.add(group);

		const material = new THREE.MeshPhongMaterial({
			color: 0x6791c9,
			wireframe: true,
			transparent: true,
			opacity: 0.8,
		});

		const geometries = [
			new THREE.IcosahedronGeometry(1, 0),
			new THREE.TorusGeometry(0.8, 0.2, 16, 100),
			new THREE.OctahedronGeometry(0.7, 0),
			new THREE.TetrahedronGeometry(0.5, 0),
			new THREE.SphereGeometry(0.4, 32, 32),
		];

		for (let i = 0; i < 15; i++) {
			const geo = geometries[Math.floor(Math.random() * geometries.length)];
			const mesh = new THREE.Mesh(geo, material);

			mesh.position.set(
				(Math.random() - 0.5) * 10,
				(Math.random() - 0.5) * 10,
				(Math.random() - 0.5) * 10,
			);

			mesh.rotation.set(
				Math.random() * Math.PI,
				Math.random() * Math.PI,
				Math.random() * Math.PI,
			);

			const scale = Math.random() * 0.5 + 0.2;
			mesh.scale.set(scale, scale, scale);

			group.add(mesh);
		}

		let mouseX = 0;
		let mouseY = 0;
		let animationFrameId: number;

		const handleMouseMove = (event: MouseEvent) => {
			mouseX = event.clientX / window.innerWidth - 0.5;
			mouseY = event.clientY / window.innerHeight - 0.5;
		};

		const handleResize = () => {
			width = container.clientWidth;
			height = container.clientHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("resize", handleResize);

		// --- ANIMATION LOOP ---
		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);

			group.rotation.y += 0.002;
			group.rotation.x += 0.001;

			// Smooth mouse parallax
			group.position.x += (mouseX * 2 - group.position.x) * 0.05;
			group.position.y += (-mouseY * 2 - group.position.y) * 0.05;

			// Individual mesh rotation
			group.children.forEach((mesh) => {
				mesh.rotation.x += 0.01;
				mesh.rotation.y += 0.01;
			});

			renderer.render(scene, camera);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", handleResize);

			if (container.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}

			geometries.forEach((geo) => geo.dispose());
			material.dispose();
			renderer.dispose();
		};
	}, []);
	return (
		<main id="main" className="flex w-full flex-col bg-primary-bg">
			<section className="relative flex h-screen w-full items-center justify-start overflow-hidden">
				<div
					className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
					style={{ display: "block" }}>
					<div ref={mountRef} style={{ width: "100%", height: "100%" }}></div>
				</div>
				<div className="from-surface-container-lowest/80 absolute inset-0 z-0 bg-linear-to-r to-transparent"></div>
				<div className="relative z-10 mx-auto mt-16 w-full max-w-360 px-margin-mobile md:mt-0 md:px-margin-desktop">
					<motion.div
						initial="hidden"
						animate="show"
						variants={{
							hidden: { opacity: 0 },
							show: {
								opacity: 1,
								transition: { staggerChildren: 0.1, delayChildren: 0.2 },
							},
						}}
						className="flex max-w-4xl flex-col items-start">
						<motion.h1
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
							className="mb-4 font-label-md text-[48px] tracking-tighter text-primary-fg md:text-display-xl">
							JAN LEIGH
						</motion.h1>
						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
							className="flex items-center gap-4">
							<div className="h-px w-8 bg-bright-cyan"></div>
							<p className="text-secondary font-label-md tracking-widest text-bright-cyan uppercase">
								FULL-STACK DEVELOPER // CS UNDERGRAD
							</p>
						</motion.div>
						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
							className="mt-12 flex gap-4">
							<Link to="/projects">
								<motion.button
									whileHover={{ y: -5, scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="text-on-primary hover:bg-primary/90 cursor-pointer rounded border border-transparent bg-bright-cyan px-8 py-3 font-label-md text-normal-black transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(103,145,201,0.35)] hover:shadow-bright-cyan/20">
									VIEW PROJECTS
								</motion.button>
							</Link>
							<Link to="/contact">
								<motion.button
									whileHover={{ y: -5, scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="text-on-surface hover:border-primary hover:text-primary cursor-pointer rounded border border-[#42474f] bg-transparent px-8 py-3 font-label-md text-primary-fg transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(103,145,201,0.12)]">
									CONTACT ME
								</motion.button>
							</Link>
						</motion.div>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4">
					<motion.span
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
						className="font-label-md text-caption-sm tracking-widest text-bright-white uppercase">
						Scroll to explore
					</motion.span>
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: 40 }}
						transition={{ duration: 1, ease: "easeOut", delay: 1.8 }}
						className="relative w-px origin-top overflow-hidden bg-[#42474f]">
						<div className="absolute top-0 left-0 h-1/3 w-full animate-[float_2s_ease-in-out_infinite] bg-bright-blue"></div>
					</motion.div>
				</motion.div>
			</section>
			<section
				id="about"
				className="relative flex min-h-screen w-full items-center justify-center overflow-hidden border-t border-[#42474f]/10 py-24">
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-100px" }}
					variants={{
						hidden: { opacity: 0 },
						show: {
							opacity: 1,
							transition: { staggerChildren: 0.2 },
						},
					}}
					className="relative z-10 mx-auto w-full max-w-5xl px-margin-mobile md:px-margin-desktop">
					<div className="flex flex-col items-center gap-12 md:flex-row md:justify-between md:gap-16">
						<motion.div
							variants={{
								hidden: { opacity: 0, scale: 0.8 },
								show: { opacity: 1, scale: 1 },
							}}
							className="group relative mx-auto flex-shrink-0 md:mx-0">
							<div className="absolute -inset-2 animate-pulse rounded-full bg-linear-to-r from-bright-cyan to-bright-blue opacity-40 blur-xl transition duration-1000 group-hover:opacity-80 group-hover:duration-200"></div>
							<img
								src="https://github.com/janleigh.png"
								alt="Jan Leigh"
								className="relative h-56 w-56 rounded-full border border-[#42474f] object-cover shadow-2xl md:h-72 md:w-72"
							/>
						</motion.div>
						<motion.div
							variants={{
								hidden: { opacity: 0, x: 20 },
								show: { opacity: 1, x: 0 },
							}}
							className="flex flex-col items-center text-center md:items-start md:text-left">
							<h2 className="mb-2 font-label-md text-4xl tracking-tight text-primary-fg md:text-5xl">
								Heya! I'm Jan Leigh!
							</h2>
							<div className="mb-8 h-1 w-12 rounded-full bg-bright-cyan"></div>
							<div className="flex flex-col gap-6 font-label-md text-lg leading-relaxed text-bright-white/80 md:text-xl">
								<p>
									I am a Filipino college student and self-taught full-stack
									developer.
								</p>
								<p>
									I've been programming since 2018, and I enjoy creating web
									applications, and occasionally shitty software.
								</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</section>
		</main>
	);
}

export default MainContainer;
