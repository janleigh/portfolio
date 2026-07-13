import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SHOWCASE_PROJECTS = [
	"dotfiles",
	"facecrack",
	"trace.moe.ts",
	"portfolio",
];

interface Repo {
	id: number;
	name: string;
	description: string;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	language: string;
	updated_at: string;
}

function Projects() {
	const [repos, setRepos] = useState<Repo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const response = await fetch(
					"https://api.github.com/users/janleigh/repos?sort=updated&per_page=100",
				);
				if (!response.ok) {
					throw new Error("Failed to fetch projects");
				}
				const data = await response.json();
				const sources = data.filter((repo: any) =>
					SHOWCASE_PROJECTS.includes(repo.name),
				);

				sources.sort((a: any, b: any) => {
					return (
						SHOWCASE_PROJECTS.indexOf(a.name) -
						SHOWCASE_PROJECTS.indexOf(b.name)
					);
				});

				// Remove repos that are not in SHOWCASE_PROJECTS
				for (let i = sources.length - 1; i >= 0; i--) {
					if (!SHOWCASE_PROJECTS.includes(sources[i].name)) {
						sources.splice(i, 1);
					}
				}

				setRepos(sources);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRepos();
	}, []);

	return (
		<div id="projects-page" className="flex w-full flex-1 flex-col">
			<div className="mt-24 flex w-full flex-1 flex-col items-center px-5 md:px-16">
				<div className="w-full max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-12">
						<h1 className="font-heading text-[40px] tracking-tight text-primary-fg md:text-h1">
							MY PROJECTS.
						</h1>
						<div className="mt-4 flex items-center gap-4">
							<div className="h-px w-8 bg-bright-cyan"></div>
							<p className="text-secondary font-body tracking-widest text-bright-cyan uppercase">
								OPEN SOURCE & EXPERIMENTS
							</p>
						</div>
					</motion.div>

					{loading ? (
						<div className="flex items-center justify-center py-20">
							<div className="h-12 w-12 animate-spin rounded-full border-4 border-bright-cyan/20 border-t-bright-cyan"></div>
						</div>
					) : error ? (
						<div className="py-20 text-center font-body text-normal-red">
							Error: {error}
						</div>
					) : (
						<motion.div
							initial="hidden"
							animate="show"
							variants={{
								hidden: { opacity: 0 },
								show: {
									opacity: 1,
									transition: {
										staggerChildren: 0.1,
									},
								},
							}}
							className="grid grid-cols-1 gap-6 pb-20 md:grid-cols-2">
							{repos.map((repo, i) => (
								<motion.a
									variants={{
										hidden: { opacity: 0, y: 20 },
										show: { opacity: 1, y: 0 },
									}}
									whileHover={{
										y: -5,
										boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
									}}
									key={repo.id}
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className={`group parallax-wrapper ${i === 0 ? "md:col-span-2" : ""}`}>
									<div className="parallax-card flex h-full flex-col justify-between overflow-hidden rounded border border-[#42474f] bg-normal-black transition-colors duration-300 hover:bg-bright-black">
										{repo.name === "dotfiles" ? (
											<div
												className={`w-full ${i === 0 ? "h-64 md:h-80" : "h-40"} relative overflow-hidden border-b border-[#42474f]/50`}>
												<img
													src="https://raw.githubusercontent.com/janleigh/dotfiles/master/.github/assets/showcase.png"
													alt={`${repo.name} banner`}
													className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
													style={{ backgroundSize: "cover" }}
												/>
												<div className="absolute inset-0 bg-linear-to-t from-bright-black/90 via-bright-black/20 to-transparent"></div>
											</div>
										) : null}
										<div className="flex flex-1 flex-col p-6">
											<div className="mb-4 flex items-start justify-between">
												<h3 className="font-heading text-[20px] text-bright-cyan transition-colors group-hover:text-primary-fg">
													{repo.name}
												</h3>
												<svg
													className="h-5 w-5 text-primary-fg/50 transition-colors group-hover:text-bright-cyan"
													fill="currentColor"
													viewBox="0 0 24 24">
													<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
												</svg>
											</div>
											<p className="mb-6 line-clamp-3 font-sans text-[14px] leading-relaxed text-primary-fg/70">
												{repo.description || "No description available."}
											</p>
											<div className="mt-auto flex items-center gap-4 border-t border-[#42474f]/30 pt-4">
												{repo.language && (
													<div className="flex items-center gap-1.5">
														<div className="h-2 w-2 rounded-full bg-normal-magenta"></div>
														<span className="font-body text-[12px] text-primary-fg/80">
															{repo.language}
														</span>
													</div>
												)}
												<div className="ml-auto flex items-center gap-1.5">
													<svg
														className="h-4 w-4 text-primary-fg/60"
														fill="currentColor"
														viewBox="0 0 24 24">
														<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
													</svg>
													<span className="font-body text-[12px] text-primary-fg/80">
														{repo.stargazers_count}
													</span>
												</div>
												<div className="flex items-center gap-1.5">
													<svg
														className="h-4 w-4 text-primary-fg/60"
														fill="currentColor"
														viewBox="0 0 24 24">
														<path d="M12 3a2 2 0 0 0-2 2 c0 1.11.89 2 2 2s2-.89 2-2-.89-2-2-2zM4 14a2 2 0 0 0 2-2c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2zm16 0a2 2 0 0 0 2-2c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2zM12 9c-1.66 0-3 1.34-3 3v5H7v-2H5v2c0 1.1.9 2 2 2h2v3h2v-3h2v-3h2v2h-2v2h2c1.1 0 2-.9 2-2v-2h-2v-5c0-1.66-1.34-3-3-3z" />
													</svg>
													<span className="font-body text-[12px] text-primary-fg/80">
														{repo.forks_count}
													</span>
												</div>
											</div>
										</div>
									</div>
								</motion.a>
							))}
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Projects;
