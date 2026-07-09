import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
	const fallback = "404. Not Found.";
	const [reason, setReason] = useState(fallback);

	useEffect(() => {
		if (window.innerWidth < 768) {
			setReason("500. Server Error.");
		} else {
			setReason(fallback);
		}
	}, []);

	return (
		<div
			id="404"
			className="bg-grid-pattern flex h-screen w-screen justify-center bg-primary-bg px-8 py-8">
			<div className="flex flex-col items-center justify-center">
				<span className="text-6xl text-primary-fg">\(o_o)/</span>
				<span
					id="reason"
					className="my-12 text-center text-3xl text-primary-fg">
					{reason.toLowerCase()}
				</span>
				<Link to="/">
					<button
						id="returnHome"
						className="text-on-primary hover:bg-primary/90 hover:border-primary
                        hover:text-primary cursor-pointer rounded border border-transparent bg-bright-cyan px-8 py-3 font-label-md text-label-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(103,145,201,0.12)] active:translate-y-0 active:scale-95">
						Return Home
					</button>
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
