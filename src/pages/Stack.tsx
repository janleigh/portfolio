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
			{
				name: "PHP",
				icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
			},
			{
				name: "Shell / Bash",
				icon: "https://cdn.simpleicons.org/gnubash/4EAA25",
			},
		],
	},
	{
		title: "Runtime & Package Managers",
		items: [
			{ name: "Node.js", icon: "https://cdn.simpleicons.org/node.js/339933" },
			{ name: "Bun", icon: "https://cdn.simpleicons.org/bun/white" },
			{ name: "npm", icon: "https://cdn.simpleicons.org/npm/CB3837" },
			{ name: "yarn", icon: "https://cdn.simpleicons.org/yarn/2C8EBB" },
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
			{ name: "DaisyUI", icon: "https://cdn.simpleicons.org/daisyui/FFC63A" },
			{ name: "Bulma", icon: "https://cdn.simpleicons.org/bulma/00D1B2" },
			{ name: "shadcn/ui", icon: "https://cdn.simpleicons.org/shadcnui/white" },
			{
				name: "Chakra UI",
				icon: "https://cdn.simpleicons.org/chakraui/319795",
			},
		],
	},
	{
		title: "Backend Frameworks",
		items: [
			{ name: "Express.js", icon: "https://cdn.simpleicons.org/express/white" },
			{ name: "tRPC", icon: "https://cdn.simpleicons.org/trpc/2596BE" },
			{ name: "h3", icon: "https://cdn.simpleicons.org/h3/1E54B7" },
		],
	},
	{
		title: "Database & ORMs",
		items: [
			{ name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
			{
				name: "PostgreSQL",
				icon: "https://cdn.simpleicons.org/postgresql/4169E1",
			},
			{ name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
			{ name: "SQLite", icon: "https://cdn.simpleicons.org/sqlite/003B57" },
			{ name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D" },
			{ name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/white" },
			{ name: "Drizzle", icon: "https://cdn.simpleicons.org/drizzle/C5F74F" },
		],
	},
	{
		title: "Mobile Development",
		items: [
			{
				name: "React Native",
				icon: "https://cdn.simpleicons.org/react/61DAFB",
			},
			{ name: "Expo", icon: "https://cdn.simpleicons.org/expo/white" },
		],
	},
	{
		title: "DevOps & Deployment",
		items: [
			{ name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
			{
				name: "Kubernetes",
				icon: "https://cdn.simpleicons.org/kubernetes/326CE5",
			},
			{ name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white" },
			{
				name: "Github Actions",
				icon: "https://cdn.simpleicons.org/githubactions/2088FF",
			},
			{ name: "PM2", icon: "https://cdn.simpleicons.org/pm2/2B037A" },
		],
	},
	{
		title: "Build Tools",
		items: [
			{ name: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF" },
			{ name: "Nx", icon: "https://cdn.simpleicons.org/nx/143055" },
			{
				name: "Turborepo",
				icon: "https://cdn.simpleicons.org/turborepo/FF1E56",
			},
		],
	},
	{
		title: "Testing & QA",
		items: [
			{ name: "Jest", icon: "https://cdn.simpleicons.org/jest/C21325" },
			{ name: "Vitest", icon: "https://cdn.simpleicons.org/vitest/646CFF" },
		],
	},
	{
		title: "Version Control",
		items: [
			{ name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
			{ name: "GitHub", icon: "https://cdn.simpleicons.org/github/white" },
			{ name: "GitLab", icon: "https://cdn.simpleicons.org/gitlab/FC6D26" },
		],
	},
	{
		title: "Design Tools",
		items: [
			{ name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
			{
				name: "Canva",
				icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
			},
			{ name: "GIMP", icon: "https://cdn.simpleicons.org/gimp/5C5549" },
		],
	},
	{
		title: "Development Tools",
		items: [
			{
				name: "Visual Studio Code",
				icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
			},
			{ name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
			{ name: "Yaak", icon: "https://cdn.simpleicons.org/yaak/4000BF" },
			{ name: "ESLint", icon: "https://cdn.simpleicons.org/eslint/4B32C3" },
			{ name: "Prettier", icon: "https://cdn.simpleicons.org/prettier/F7B93E" },
			{ name: "Biome", icon: "https://cdn.simpleicons.org/biome/60A5FA" },
			{ name: "Oxc", icon: "https://cdn.simpleicons.org/oxc/00F7F1" },
		],
	},
];

function Stack() {
	return (
		<div id="stack-page" className="flex w-full flex-1 flex-col">
			<div className="mt-24 flex w-full flex-1 flex-col items-center px-5 md:px-16">
				<div className="w-full max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-16">
						<h1 className="font-heading text-[40px] tracking-tight text-primary-fg md:text-h1">
							TECH STACK.
						</h1>
						<div className="mt-4 flex items-center gap-4">
							<div className="h-px w-8 bg-bright-cyan"></div>
							<p className="text-secondary font-body tracking-widest text-bright-cyan uppercase">
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
								<h2 className="mb-6 border-b border-[#42474f]/50 pb-2 font-heading text-[24px] text-primary-fg">
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
											<h3 className="text-center font-body text-[14px] text-primary-fg transition-colors group-hover:text-bright-cyan">
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
