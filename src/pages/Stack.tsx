import { motion } from "framer-motion";
const STACK_CATEGORIES = [
	{
		title: "Languages",
		items: [
			{
				name: "JS / TS",
				icon: "https://cdn.simpleicons.org/typescript/3178C6",
			},
			{ name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
			{
				name: "Java / Kotlin",
				icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
			},
		],
	},
	{
		title: "Frontend Frameworks",
		items: [
			{ name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
			{ name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
			{ name: "Astro", icon: "https://cdn.simpleicons.org/astro/white" },
			{ name: "Solid.js", icon: "https://cdn.simpleicons.org/solid/2C4F7C" },
		],
	},
	{
		title: "Styling & UI",
		items: [
			{
				name: "Tailwind CSS",
				icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
			},
			{ name: "shadcn/ui", icon: "https://cdn.simpleicons.org/shadcnui/white" },
			{ name: "Bulma", icon: "https://cdn.simpleicons.org/bulma/00D1B2" },
		],
	},
	{
		title: "Backend & Database",
		items: [
			{ name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
			{ name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/white" },
			{ name: "Drizzle", icon: "https://cdn.simpleicons.org/drizzle/C5F74F" },
		],
	},
	{
		title: "Mobile & Tooling",
		items: [
			{
				name: "React Native",
				icon: "https://cdn.simpleicons.org/react/61DAFB",
			},
			{ name: "Expo", icon: "https://cdn.simpleicons.org/expo/white" },
			{ name: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF" },
		],
	},
];

function Stack() {
	return (
		<div id="stack-page" className="flex w-full flex-1 flex-col">
			<div className="mt-24 flex w-full flex-1 flex-col items-center px-margin-mobile md:px-margin-desktop">
				<div className="w-full max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-16">
						<h1 className="font-display-xl text-[40px] tracking-tighter text-primary-fg md:text-display-xl">
							TECH STACK.
						</h1>
						<div className="mt-4 flex items-center gap-4">
							<div className="h-px w-8 bg-bright-cyan"></div>
							<p className="text-secondary font-label-md tracking-widest text-bright-cyan uppercase">
								TOOLS & TECHNOLOGIES
							</p>
						</div>
					</motion.div>

					<div className="flex flex-col gap-12 pb-20">
						{STACK_CATEGORIES.map((category, categoryIdx) => (
							<motion.div
								key={category.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.5, delay: categoryIdx * 0.1 }}>
								<h2 className="mb-6 border-b border-[#42474f]/50 pb-2 font-headline-lg-mobile text-[24px] text-primary-fg">
									{category.title}
								</h2>
								<motion.div
									initial="hidden"
									whileInView="show"
									viewport={{ once: true }}
									variants={{
										hidden: { opacity: 0 },
										show: {
											opacity: 1,
											transition: { staggerChildren: 0.1 },
										},
									}}
									className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
									{category.items.map((tech) => (
										<motion.div
											key={tech.name}
											variants={{
												hidden: { opacity: 0, scale: 0.9 },
												show: { opacity: 1, scale: 1 },
											}}
											whileHover={{ y: -5 }}
											className="group flex flex-col items-center justify-center gap-4 rounded border border-[#42474f] bg-normal-black p-6 transition-colors duration-300 hover:border-bright-cyan/50 hover:bg-bright-black">
											<img
												src={tech.icon}
												alt={`${tech.name} logo`}
												className="h-12 w-12 object-contain drop-shadow-md filter transition-transform duration-300 group-hover:scale-110"
											/>
											<h3 className="text-center font-label-md text-[14px] text-primary-fg transition-colors group-hover:text-bright-cyan">
												{tech.name}
											</h3>
										</motion.div>
									))}
								</motion.div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Stack;
