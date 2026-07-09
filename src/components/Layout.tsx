import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	in: {
		opacity: 1,
		y: 0,
	},
	out: {
		opacity: 0,
		y: -20,
	},
};

const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.4,
} as const;

function Layout() {
	const location = useLocation();
	const element = useOutlet();

	return (
		<div className="bg-grid-pattern flex min-h-screen w-full flex-col overflow-x-hidden bg-primary-bg">
			<Navbar />
			<AnimatePresence
				mode="wait"
				initial={false}
				onExitComplete={() => window.scrollTo(0, 0)}>
				<motion.div
					key={location.pathname}
					initial="initial"
					animate="in"
					exit="out"
					variants={pageVariants}
					transition={pageTransition}
					className="flex w-full flex-1 flex-col">
					{element}
				</motion.div>
			</AnimatePresence>
			<Footer />
		</div>
	);
}

export default Layout;
