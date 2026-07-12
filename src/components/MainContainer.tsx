import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as THREE from "three";

// Separated to make maintaining of 3D background easier
function MainContainer() {
	const mountRef = useRef<HTMLDivElement>(null);

	const getYearOfExperience = () => {
		const today = new Date();
		const startDate = new Date(2018, 6, 7);
		let years = today.getFullYear() - startDate.getFullYear();
		const m = today.getMonth() - startDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
			years--;
		}
		return years;
	}

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
				<div className="relative z-10 mx-auto mt-16 w-full max-w-360 px-5 md:mt-0 md:px-16">
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
							className="mb-4 font-mono text-[48px] tracking-tighter text-primary-fg md:text-h1">
							JAN LEIGH
						</motion.h1>
						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
							className="flex items-center gap-4 mb-2">
							<p className="text-secondary font-mono italic tracking-widest text-bright-yellow uppercase">
								"I build things for the web."
							</p>
						</motion.div>
						<motion.div
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
							className="flex items-center gap-4">
							<div className="h-px w-8 bg-bright-cyan"></div>
							<p className="text-secondary font-mono tracking-widest text-bright-cyan uppercase">
								CS Undergraduate • Full-Stack Developer • Philippines
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
									className="text-on-primary hover:bg-primary/90 cursor-pointer rounded border border-transparent bg-bright-cyan px-8 py-3 font-mono text-normal-black transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(103,145,201,0.35)] hover:shadow-bright-cyan/20">
									[ VIEW MY WORK ]
								</motion.button>
							</Link>
							<Link to="/contact">
								<motion.button
									whileHover={{ y: -5, scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="text-on-surface hover:border-primary hover:text-primary cursor-pointer rounded border border-[#42474f] bg-transparent px-8 py-3 font-mono text-primary-fg transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(103,145,201,0.12)]">
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
						className="font-mono text-xs tracking-widest text-bright-white uppercase">
						Scroll to explore
					</motion.span>
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: 40 }}
						transition={{ duration: 1, ease: "easeOut", delay: 1.8 }}
						className="relative w-px origin-top overflow-hidden bg-[#42474f]">
						<motion.div 
							animate={{ y: ["0%", "200%", "0%"] }}
							transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
							className="absolute top-0 left-0 h-1/3 w-full bg-bright-blue"
						/>
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
					className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-16">
					<div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
						{/* Avatar commented out 
						<motion.div
							variants={{
								hidden: { opacity: 0, scale: 0.8 },
								show: { opacity: 1, scale: 1 },
							}}
							className="group relative mx-auto shrink-0 lg:mx-0 lg:sticky lg:top-32">
							<div className="absolute -inset-2 animate-pulse rounded-full bg-linear-to-r/shorter from-bright-cyan to-bright-blue opacity-40 blur-xl transition duration-1000 group-hover:opacity-80 group-hover:duration-200"></div>
							<img
								src="https://github.com/janleigh.png"
								alt="Jan Leigh"
								className="relative h-56 w-56 rounded-full border border-[#42474f] object-cover shadow-2xl md:h-72 md:w-72"
							/>
						</motion.div>
						*/}
						<motion.div
							variants={{
								hidden: { opacity: 0, x: 20 },
								show: { opacity: 1, x: 0 },
							}}
							className="mx-auto flex w-full max-w-4xl flex-col items-center text-center lg:items-start lg:text-left">
							<div className="mb-4 inline-block rounded-full border border-bright-cyan/30 bg-bright-cyan/10 px-4 py-1.5 font-mono text-xs tracking-widest text-bright-cyan uppercase">
								About Me
							</div>
							<h2 className="mb-6 font-mono text-4xl tracking-tight text-primary-fg md:text-5xl">
								Hey, I'm Jan Leigh.
							</h2>
							
							<div className="flex flex-col gap-6 font-mono leading-relaxed text-bright-white/80">
								<p className="text-xl font-medium text-bright-white md:text-2xl leading-snug">
									Full-stack developer specializing in modern web applications.
								</p>
								<p className="text-base md:text-lg">
									I am a Filipino college student and self-taught developer. I've been programming since 2018, and I enjoy creating intuitive web experiences, robust backend APIs, diving into open-source projects and occasionally weird side projects.
								</p>
							</div>
							<div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
								<div className="group flex flex-col gap-2 rounded-xl border border-[#42474f]/50 bg-black/20 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-bright-cyan/50 hover:shadow-[0_8px_30px_rgba(103,145,201,0.15)]">
									<div className="text-bright-cyan font-bold text-3xl">{getYearOfExperience()}+</div>
									<div className="text-bright-white/80 font-mono text-sm">Years of Experience</div>
								</div>
								<div className="group flex flex-col gap-2 rounded-xl border border-[#42474f]/50 bg-black/20 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-bright-cyan/50 hover:shadow-[0_8px_30px_rgba(103,145,201,0.15)]">
									<div className="text-bright-cyan font-bold text-3xl">CS</div>
									<div className="text-bright-white/80 font-mono text-sm">Undergraduate Student</div>
								</div>
								<div className="group flex flex-col gap-2 rounded-xl border border-[#42474f]/50 bg-black/20 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-bright-cyan/50 hover:shadow-[0_8px_30px_rgba(103,145,201,0.15)]">
									<div className="text-bright-cyan font-bold text-3xl">OSS</div>
									<div className="text-bright-white/80 font-mono text-sm">Active Contributor</div>
								</div>
							</div>
							<div className="mt-16 w-full text-left">
								<h3 className="mb-8 font-mono text-2xl tracking-tight text-primary-fg">Experience</h3>
								<div className="ml-2 flex flex-col gap-8 border-l border-[#42474f]/50 pl-6">
									<div className="relative">
										<div className="absolute -left-7.5 top-1.5 h-3 w-3 rounded-full bg-bright-cyan"></div>
										<div className="flex flex-col gap-1">
											<h4 className="font-mono text-xl text-bright-white">Mobile App Developer</h4>
											<span className="font-mono text-base text-bright-white/80">Thesis Commission (malinaonow) • Freelance</span>
											<span className="font-mono text-sm text-bright-cyan mb-2">Jul 2025 - Oct 2025 • Remote</span>
											<p className="text-bright-white/70 text-base leading-relaxed">
												Developed "malinaonow", a fully functional mobile application using Expo and React Native, commissioned as a university thesis project.
											</p>
										</div>
									</div>
									<div className="relative">
										<div className="absolute -left-7.5 top-1.5 h-3 w-3 rounded-full bg-[#42474f]"></div>
										<div className="flex flex-col gap-1">
											<h4 className="font-mono text-xl text-bright-white">Website Developer</h4>
											<span className="font-mono text-base text-bright-white/80">Salazar Gents Salon • Freelance</span>
											<span className="font-mono text-sm text-bright-cyan mb-2">Nov 2023 - 1 mo • United Arab Emirates (Remote)</span>
											<p className="text-bright-white/70 text-base leading-relaxed">
												Designed and developed a modern web presence for a gents salon, enhancing their digital footprint and client outreach.
											</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</section>
		</main>
	);
}

export default MainContainer;
