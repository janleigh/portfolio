function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="flex w-full shrink-0 border-t border-[#42474f]/10 bg-normal-black py-6">
			<div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-base px-margin-mobile md:flex-row md:px-margin-desktop">
				<div className="text-center font-label-md text-label-md text-bright-white md:text-left">
					© {currentYear}{" "}
					<span className="text-bright-cyan">Jan Leigh Muñoz</span>. All Rights
					Reserved.
				</div>
			</div>
		</div>
	);
}

export default Footer;
