import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const TerminalAnimation = () => {
	const [text, setText] = useState("");
	const codeLines = [
		"janleigh@portfolio ~$ whoami",
		"> janleigh",
		"janleigh@portfolio ~$ ./skills --list",
		"> [React, Node.js, TypeScript, Next.js, Python]",
		"janleigh@portfolio ~$ status",
		"> Full-stack developer. Ready for new challenges.",
		"janleigh@portfolio ~$",
	];
	const fullText = codeLines.join("\n");

	useEffect(() => {
		let currentIndex = 0;
		const interval = setInterval(() => {
			if (currentIndex <= fullText.length) {
				setText(fullText.slice(0, currentIndex));
				currentIndex++;
			} else {
				clearInterval(interval);
			}
		}, 30);
		return () => clearInterval(interval);
	}, [fullText]);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.8, delay: 0.5 }}
			className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[#42474f] shadow-2xl"
			style={{ backgroundColor: "#0C0D0E" }}>
			<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-primary-fg/5" />
			<div className="relative z-10 flex h-10 w-full items-center gap-2 border-b border-[#42474f] bg-[#1a1b1c] px-4">
				<div className="h-3 w-3 rounded-full bg-bright-red"></div>
				<div className="h-3 w-3 rounded-full bg-bright-yellow"></div>
				<div className="h-3 w-3 rounded-full bg-bright-green"></div>
				<div className="absolute inset-0 flex items-center justify-center font-body text-xs tracking-[-0.075em] text-[#a0a0a0]">
					janleigh@portfolio : ~
				</div>
			</div>
			<div className="relative z-10 flex h-64 flex-col p-5 font-body text-sm leading-relaxed tracking-[-0.075em] sm:text-base">
				{text.split("\n").map((line, i) => {
					if (line.startsWith("janleigh@portfolio")) {
						const prompt = "janleigh@portfolio";
						const symbol = " ~$";
						const promptFull = prompt + symbol;
						if (line.length <= prompt.length) {
							return (
								<div className="mt-2" key={i}>
									<span style={{ color: "#23d18b" }}>{line}</span>
								</div>
							);
						} else if (line.length <= promptFull.length) {
							return (
								<div className="mt-2" key={i}>
									<span style={{ color: "#23d18b" }}>{prompt}</span>
									<span style={{ color: "#C0CCC0" }}>
										{line.slice(prompt.length)}
									</span>
								</div>
							);
						} else {
							const command = line.slice(promptFull.length);
							return (
								<div className="mt-2" key={i}>
									<span style={{ color: "#23d18b" }}>{prompt}</span>
									<span style={{ color: "#C0CCC0" }}>{symbol}</span>
									<span style={{ color: "#F9F1A5" }}>{command}</span>
									{i === text.split("\n").length - 1 &&
										text.length !== fullText.length && (
											<span className="ml-1 inline-block h-4 w-2 animate-pulse bg-primary-fg align-middle" />
										)}
									{i === text.split("\n").length - 1 &&
										text.length === fullText.length && (
											<span className="ml-1 inline-block h-4 w-2 animate-pulse bg-primary-fg align-middle" />
										)}
								</div>
							);
						}
					} else if (line.startsWith(">")) {
						return (
							<div key={i}>
								<span style={{ color: "#61D6D6" }}>{line}</span>
							</div>
						);
					}
					return (
						<div className="mt-2" key={i}>
							<span style={{ color: "#C0CCC0" }}>{line}</span>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
};

function MainContainer() {
	const mountRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll();

	// Parallax transforms
	const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);
	const yHeroVisual = useTransform(scrollYProgress, [0, 1], [0, 150]);
	const yBackground = useTransform(scrollYProgress, [0, 1], [0, 400]);
	const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

	const getYearOfExperience = () => {
		const today = new Date();
		const startDate = new Date(2018, 6, 7);
		let years = today.getFullYear() - startDate.getFullYear();
		const m = today.getMonth() - startDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
			years--;
		}
		return years;
	};

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

		const pointLight = new THREE.PointLight(0x7fc8db, 2);
		pointLight.position.set(5, 5, 5);
		scene.add(pointLight);

		// --- NETWORK GRAPH (Nodes and Connections) ---
		const group = new THREE.Group();
		scene.add(group);

		const particleCount = 120;
		const particlesGeometry = new THREE.BufferGeometry();
		const particlePositions = new Float32Array(particleCount * 3);
		const particleVelocities: THREE.Vector3[] = [];

		for (let i = 0; i < particleCount; i++) {
			particlePositions[i * 3] = (Math.random() - 0.5) * 12;
			particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
			particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

			particleVelocities.push(
				new THREE.Vector3(
					(Math.random() - 0.5) * 0.015,
					(Math.random() - 0.5) * 0.015,
					(Math.random() - 0.5) * 0.015,
				),
			);
		}

		particlesGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(particlePositions, 3),
		);

		const particleMaterial = new THREE.PointsMaterial({
			color: 0x7fc8db,
			size: 0.06,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		const pointCloud = new THREE.Points(particlesGeometry, particleMaterial);
		group.add(pointCloud);

		const linesMaterial = new THREE.LineBasicMaterial({
			color: 0x7fc8db,
			transparent: true,
			opacity: 0.15,
		});

		// max connections can be n * (n-1) / 2
		const maxLines = (particleCount * (particleCount - 1)) / 2;
		const linePositions = new Float32Array(maxLines * 6); // 2 vertices per line, 3 coords per vertex
		const lineGeometry = new THREE.BufferGeometry();
		lineGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(linePositions, 3),
		);
		const linesMesh = new THREE.LineSegments(lineGeometry, linesMaterial);
		group.add(linesMesh);

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

			// Rotate the entire group slowly
			group.rotation.y += 0.001;
			group.rotation.x += 0.0005;

			// Smooth mouse parallax for the group
			group.position.x += (mouseX * 1.5 - group.position.x) * 0.05;
			group.position.y += (-mouseY * 1.5 - group.position.y) * 0.05;

			// Update particle positions
			const positions = pointCloud.geometry.attributes.position
				.array as Float32Array;

			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] += particleVelocities[i].x;
				positions[i * 3 + 1] += particleVelocities[i].y;
				positions[i * 3 + 2] += particleVelocities[i].z;

				// Boundary check to keep particles in a box
				if (Math.abs(positions[i * 3]) > 6) particleVelocities[i].x *= -1;
				if (Math.abs(positions[i * 3 + 1]) > 6) particleVelocities[i].y *= -1;
				if (Math.abs(positions[i * 3 + 2]) > 5) particleVelocities[i].z *= -1;
			}
			pointCloud.geometry.attributes.position.needsUpdate = true;

			// Update lines between nearby particles
			let lineIndex = 0;
			for (let i = 0; i < particleCount; i++) {
				for (let j = i + 1; j < particleCount; j++) {
					// yo im not explaining all this
					const dx = positions[i * 3] - positions[j * 3];
					const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
					const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
					const distSq = dx * dx + dy * dy + dz * dz;

					// Connect if distance squared is less than a threshold
					if (distSq < 2.5) {
						linePositions[lineIndex++] = positions[i * 3];
						linePositions[lineIndex++] = positions[i * 3 + 1];
						linePositions[lineIndex++] = positions[i * 3 + 2];

						linePositions[lineIndex++] = positions[j * 3];
						linePositions[lineIndex++] = positions[j * 3 + 1];
						linePositions[lineIndex++] = positions[j * 3 + 2];
					}
				}
			}
			linesMesh.geometry.setDrawRange(0, lineIndex / 3);
			linesMesh.geometry.attributes.position.needsUpdate = true;

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

			particlesGeometry.dispose();
			particleMaterial.dispose();
			lineGeometry.dispose();
			linesMaterial.dispose();
			renderer.dispose();
		};
	}, []);
	return (
		<main id="main" className="flex w-full flex-col bg-primary-bg">
			<section className="relative flex min-h-screen w-full items-center justify-start overflow-hidden">
				<motion.div
					style={{ y: yBackground }}
					className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60">
					<div ref={mountRef} style={{ width: "100%", height: "100%" }}></div>
				</motion.div>
				<div className="absolute inset-0 z-0 bg-linear-to-r to-transparent"></div>
				<motion.div
					style={{ opacity: opacityHero }}
					className="relative z-10 mx-auto mt-16 w-full max-w-7xl px-5 md:mt-0 md:px-16">
					<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
						<motion.div
							style={{ y: yHeroText }}
							initial="hidden"
							animate="show"
							variants={{
								hidden: { opacity: 0 },
								show: {
									opacity: 1,
									transition: { staggerChildren: 0.1, delayChildren: 0.2 },
								},
							}}
							className="flex flex-col items-start">
							<motion.h1
								variants={{
									hidden: { opacity: 0, y: 20 },
									show: { opacity: 1, y: 0 },
								}}
								className="mb-4 font-heading text-[48px] tracking-tight text-primary-fg md:text-h1">
								JAN LEIGH
							</motion.h1>
							<motion.div
								variants={{
									hidden: { opacity: 0, y: 20 },
									show: { opacity: 1, y: 0 },
								}}
								className="mb-2 flex items-center gap-4">
								<p className="text-secondary font-body tracking-tight text-preferred-purple uppercase">
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
								<p className="text-secondary font-body tracking-tight text-bright-cyan uppercase">
									CS Undergraduate • Full-Stack Developer • Philippines
								</p>
							</motion.div>
							<motion.div
								variants={{
									hidden: { opacity: 0, y: 20 },
									show: { opacity: 1, y: 0 },
								}}
								className="mt-12 flex flex-wrap gap-4">
								<Link to="/projects">
									<motion.button
										whileHover={{ y: -5, scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="cursor-pointer rounded border border-transparent bg-preferred-yellow px-8 py-3 font-body font-bold text-normal-black transition-colors duration-300">
										[ VIEW MY WORK ]
									</motion.button>
								</Link>
								<Link to="/contact">
									<motion.button
										whileHover={{ y: -5, scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="cursor-pointer rounded border border-[#42474f] bg-transparent px-8 py-3 font-body font-bold text-primary-fg transition-colors duration-300">
										CONTACT ME
									</motion.button>
								</Link>
							</motion.div>
						</motion.div>
						<motion.div
							style={{ y: yHeroVisual }}
							className="hidden w-full justify-end lg:flex">
							<TerminalAnimation />
						</motion.div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4">
					<motion.span
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
						className="font-body text-xs tracking-[.2em] text-bright-white uppercase">
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
						hidden: { opacity: 0, y: 50 },
						show: {
							opacity: 1,
							y: 0,
							transition: {
								staggerChildren: 0.2,
								duration: 0.6,
								ease: "easeOut",
							},
						},
					}}
					className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-16">
					<div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
						<motion.div
							variants={{
								hidden: { opacity: 0, x: 20 },
								show: { opacity: 1, x: 0 },
							}}
							className="mx-auto flex w-full max-w-4xl flex-col items-center text-center lg:items-start lg:text-left">
							<div className="mb-4 inline-block rounded-full border border-bright-cyan/30 bg-transparent px-4 py-1.5 font-body text-xs tracking-widest text-bright-cyan uppercase">
								About Me
							</div>
							<h2 className="mb-6 font-body text-4xl font-bold tracking-wide text-primary-fg md:text-5xl">
								Hey, I'm Jan Leigh.
							</h2>

							<div className="flex flex-col gap-6 font-body leading-relaxed text-bright-white/80">
								<p className="text-xl leading-snug font-medium text-bright-white md:text-2xl">
									Full-stack developer specializing in modern web applications.
								</p>
								<p className="text-base md:text-lg">
									I am a Filipino college student and self-taught developer.
									I've been programming since 2018, and I enjoy creating
									intuitive web experiences, robust backend APIs, diving into
									open-source projects and occasionally weird side projects.
								</p>
							</div>
							<div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
								<div className="group flex flex-col gap-2 rounded-xl border border-[#42474f]/50 bg-black/20 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-bright-green/50 hover:shadow-[0_8px_30px_rgba(127,200,219,0.15)]">
									<div className="text-3xl font-bold text-bright-green">
										{getYearOfExperience()}+
									</div>
									<div className="font-body text-sm text-bright-white/80">
										Years of Experience
									</div>
								</div>
								<div className="group flex flex-col gap-2 rounded-xl border border-[#42474f]/50 bg-black/20 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-bright-cyan/50 hover:shadow-[0_8px_30px_rgba(127,200,219,0.15)]">
									<div className="text-3xl font-bold text-bright-cyan">CS</div>
									<div className="font-body text-sm text-bright-white/80">
										Undergraduate Student
									</div>
								</div>
								<div className="group flex flex-col gap-2 rounded-xl border border-[#42474f]/50 bg-black/20 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-preferred-yellow/50 hover:shadow-[0_8px_30px_rgba(127,200,219,0.15)]">
									<div className="text-3xl font-bold text-preferred-yellow">
										OSS
									</div>
									<div className="font-body text-sm text-bright-white/80">
										Active Contributor
									</div>
								</div>
							</div>
							<div className="mt-16 w-full text-left">
								<h3 className="mb-8 font-body text-2xl font-bold tracking-tight text-primary-fg">
									Experience
								</h3>
								<div className="ml-2 flex flex-col gap-8 border-l border-[#42474f]/50 pl-6">
									<div className="relative">
										<div className="absolute top-2 -left-7.5 h-3 w-3 rounded-full bg-bright-cyan"></div>
										<div className="flex flex-col gap-1">
											<h4 className="font-body text-xl font-bold text-bright-white">
												Mobile App Developer
											</h4>
											<span className="font-body text-base tracking-tight text-bright-white/80">
												Thesis Commission (malinaonow) • Freelance
											</span>
											<span className="mb-2 font-body text-sm text-bright-cyan uppercase">
												Jul 2025 - Oct 2025 • Remote
											</span>
											<p className="text-base leading-relaxed text-bright-white/70">
												Developed "malinaonow", a fully functional mobile
												application using Expo and React Native, commissioned as
												a university thesis project.
											</p>
										</div>
									</div>
									<div className="relative">
										<div className="absolute top-2 -left-7.5 h-3 w-3 rounded-full bg-[#42474f]"></div>
										<div className="flex flex-col gap-1">
											<h4 className="font-body text-xl font-bold text-bright-white">
												Website Developer
											</h4>
											<span className="font-body text-base tracking-tight text-bright-white/80">
												Salazar Gents Salon • Freelance
											</span>
											<span className="mb-2 font-body text-sm text-bright-cyan uppercase">
												Nov 2023 • United Arab Emirates (Remote)
											</span>
											<p className="text-base leading-relaxed text-bright-white/70">
												Designed and developed a modern web presence for a gents
												salon, enhancing their digital footprint and client
												outreach.
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
