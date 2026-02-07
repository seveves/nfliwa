export function Info() {
	return (
		<div className="bg-blue-900/90 text-green-50 rounded-lg shadow-lg p-6 sm:p-8">
			<h1 className="text-3xl sm:text-4xl font-bold m-0 p-0 mb-4">
				Wir engagieren uns ...
			</h1>
			<ul className="mt-6 pl-0 space-y-3">
				<li className="py-1">
					für eine sozial-ökologische{" "}
					<a
						href="https://www.naturfreunde.de/movum-briefe-zur-transformation"
						className="underline"
					>
						Transformation
					</a>{" "}
					von Politik und Gesellschaft
				</li>
				<li className="py-1">für naturnahe und bezahlbare Erholung für alle</li>
				<li className="py-1">
					im Natur- und Umweltschutz, zum Beispiel beim Engagement für den
					Erhalt der Biologischen Vielfalt
				</li>
				<li className="py-1">
					in der Umweltbildung für Kinder und Jugendliche
				</li>
				<li className="py-1">
					für die Energiewende, zum Beispiel beim Engagement gegen Fracking,
					Kohle, Atom und Bebauung von Landschaftsschutzgebieten
				</li>
				<li className="py-1">
					im Natursport, zum Beispiel bei der Ausbildung im naturfreundlichen
					Breitensport
				</li>
				<li className="py-1">
					für einen sanften Tourismus (zum Beispiel auf unseren{" "}
					<a
						href="https://www.naturfreunde.de/natura-trails"
						className="underline"
					>
						Natura Trails
					</a>
					, wie auch einer in unserer Umgebung entstehen soll)
				</li>
			</ul>
			<div className="mt-8">
				<a
					href="/mitgliedschaft"
					className="inline-block px-6 py-3 text-center text-gray-800 bg-teal-200 no-underline transition-colors duration-500 rounded-lg hover:bg-teal-300"
				>
					Infos zur Mitgliedschaft
				</a>
			</div>
		</div>
	);
}
