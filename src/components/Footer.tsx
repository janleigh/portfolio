function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="flex w-full shrink-0 border-t border-[#42474f]/10 bg-normal-black py-6">
			<div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-2 px-5 md:flex-row md:px-16">
				<div className="text-center font-heading text-sm text-bright-white md:text-left">
					© {currentYear}{" "}
					<span className="bg-linear-to-r from-preferred-blue via-preferred-pink to-preferred-yellow bg-clip-text text-transparent">
						Jan Leigh Muñoz
					</span>
					. All Rights Reserved.
				</div>
			</div>
		</div>
	);
}

export default Footer;
