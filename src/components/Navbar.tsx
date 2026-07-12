import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div
			id="navbar"
			className="flex w-full flex-row items-center justify-center border-b border-[#42474f] bg-normal-black lg:fixed lg:top-0 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center"
			style={{ zIndex: "100" }}>
			<div className="flex justify-start lg:justify-self-start">
				<Link to="/">
					<span className="ml-4 py-4 font-geist-pixel text-primary-fg">
						janleigh<span className="text-bright-cyan">.is-a.dev</span>
					</span>
				</Link>
			</div>
			<div className="hidden gap-8 lg:flex lg:justify-self-center">
				<Link
					to="/"
					className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bright-cyan after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-bright-cyan hover:after:scale-x-100">
					Home
				</Link>
				<Link
					to="/projects"
					className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bright-cyan after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-bright-cyan hover:after:scale-x-100">
					Projects
				</Link>
				<Link
					to="/stack"
					className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bright-cyan after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-bright-cyan hover:after:scale-x-100">
					Stack
				</Link>
				<Link
					to="/contact"
					className="relative py-4 text-sm text-primary-fg transition-all duration-300 ease-out after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bright-cyan after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:text-bright-cyan hover:after:scale-x-100">
					Contact
				</Link>
			</div>
			<div className="flex lg:my-auto lg:justify-self-end">
				<div className="flex flex-row md:mr-4">
					<Link
						to="/easter-egg"
						className="p-4 text-primary-fg transition-colors hover:text-bright-cyan"
						title="Surprise!">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							width="24"
							viewBox="0 0 512 512">
							<path
								fill="currentColor"
								d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM358.5 352H153.5c-9.6 0-17.5-7.8-17.5-17.5V177.5c0-9.6 7.8-17.5 17.5-17.5h205c9.6 0 17.5 7.8 17.5 17.5v157c0 9.7-7.9 17.5-17.5 17.5zM344 192H168v128h176V192z"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
