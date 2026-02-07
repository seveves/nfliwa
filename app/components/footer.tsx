export function Footer() {
	return (
		<footer className="w-full mb-12">
			<div className="text-center">
				<img
					src="/naturfreunde_logo.gif"
					alt="Naturfreunde Logo"
					className="h-24 sm:h-32 md:h-40 lg:h-48 mx-auto"
				/>
			</div>
			<div className="text-center mt-6">
				<a href="/impressum" className="text-gray-800 mr-4 hover:underline">
					Impressum
				</a>
				<a href="/datenschutz" className="text-gray-800 hover:underline">
					Datenschutz
				</a>
			</div>
		</footer>
	);
}
