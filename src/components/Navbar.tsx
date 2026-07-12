import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative z-50 w-full lg:fixed lg:top-0">
			<div
				id="navbar"
				className="flex w-full flex-row items-center justify-between border-b border-[#42474f] bg-normal-black px-4 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
				<div className="flex justify-start lg:justify-self-start">
					<Link to="/">
						<span className="inline-block py-4 font-pixel text-primary-fg">
							<span className="bg-linear-to-r from-preferred-blue via-preferred-pink to-preferred-yellow bg-clip-text text-transparent">
								janleigh<span className="text-bright-cyan">.is-a.dev</span>
							</span>
						</span>
					</Link>
				</div>
				<div className="hidden gap-8 lg:flex lg:justify-self-center">
					<Link
						to="/"
						className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-preferred-blue after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-preferred-blue hover:after:scale-x-100">
						Home
					</Link>
					<Link
						to="/projects"
						className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-preferred-pink after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-preferred-pink hover:after:scale-x-100">
						Projects
					</Link>
					<Link
						to="/stack"
						className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-preferred-purple after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-preferred-purple hover:after:scale-x-100">
						Stack
					</Link>
					<Link
						to="/contact"
						className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-preferred-yellow after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-preferred-yellow hover:after:scale-x-100">
						Contact
					</Link>
				</div>
				<div className="hidden lg:my-auto lg:flex lg:justify-self-end">
					<div className="flex flex-row md:mr-4">
						<Link
							to="/easter-egg"
							className="p-4 text-primary-fg transition-all duration-300 hover:-translate-y-0.5 hover:text-preferred-pink"
							title="Surprise!">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.75"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true">
								<path d="M12 3c-2.4 0-4.2 1.6-5.3 4.1C5.6 9.3 5 11.4 5 13.6 5 18 8.1 21 12 21s7-3 7-7.4c0-2.2-.6-4.3-1.7-6.5C16.2 4.6 14.4 3 12 3Z" />
								<path d="M9.8 9.4 12 11.6l1.8-1.8 1.4 1.4-2.1 2.1 1.3 1.3-1.4 1.4-1.3-1.3-1.9 1.9-1.4-1.4 2.1-2.1-1.8-1.8 1.1-1.9Z" />
							</svg>
						</Link>
					</div>
				</div>
				<div className="flex lg:hidden">
					<button
						onClick={toggleMenu}
						className="p-2 text-primary-fg transition-all duration-300 hover:-translate-y-0.5 hover:text-preferred-blue focus:outline-none"
						aria-label="Toggle menu">
						{isOpen ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="absolute top-full left-0 flex w-full flex-col items-center space-y-4 border-b border-[#42474f] bg-[linear-gradient(180deg,rgba(18,19,23,0.98),rgba(12,13,14,0.98))] py-4 shadow-lg lg:hidden">
					<Link
						to="/"
						onClick={toggleMenu}
						className="text-primary-fg transition-colors hover:text-preferred-blue">
						Home
					</Link>
					<Link
						to="/projects"
						onClick={toggleMenu}
						className="text-primary-fg transition-colors hover:text-preferred-pink">
						Projects
					</Link>
					<Link
						to="/stack"
						onClick={toggleMenu}
						className="text-primary-fg transition-colors hover:text-preferred-purple">
						Stack
					</Link>
					<Link
						to="/contact"
						onClick={toggleMenu}
						className="text-primary-fg transition-colors hover:text-preferred-yellow">
						Contact
					</Link>
					<Link
						to="/easter-egg"
						onClick={toggleMenu}
						className="flex items-center gap-2 text-primary-fg transition-colors hover:text-preferred-pink">
						Surprise!
					</Link>
				</div>
			)}
		</div>
	);
}

export default Navbar;
