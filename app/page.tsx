export default function Home() {
	return (
		<div className="min-h-screen bg-emerald-50 bg-contain bg-center bg-fixed bg-no-repeat" style={{
			backgroundImage: `url('/nfliwa-bg.jpeg')`,
		}}>
			{/* First Row: About and Info */}
		<section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
					<About />
					<Info />
				</div>
			</section>

			{/* Second Row: Social Media */}
		<section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
					<SocialMediaCard
						title="Social Media"
						description="Egal ob auf Facebook oder Instagram."
						details="Verfolge unsere Aktivitäten oder verlinke uns bei deinen Aktivitäten rund um unser NaturFreunde-Haus."
						hashtag="#naturfreundelichtenwald"
						links={[
							{
								href: 'https://fb.me/naturfreundelichtenwald',
								label: '@naturfreundelichtenwald auf Facebook',
								icon: 'facebook',
							},
							{
								href: 'https://instagram.com/naturfreundelichtenwald',
								label: '@naturfreundelichtenwald auf Instagram',
								icon: 'instagram',
							},
						]}
					/>
					<SocialMediaCard
						title="Vereinsleben"
						description="Egal ob bei unseren Vereinsabenden, in der Seniorengruppe oder der Frauengymnastik."
						details="Besonders stolz sind wir auf unser naturpädagogisches Angebot für Grundschulkinder der 1. bis 3. Klasse: die Umweltdetektive! Neben den ganz kleinen Umweltentdeckern bieten wir desweiteren mit der Naturforscherwerkstatt ein Angebot für Kinder der 4. bis 7. Klasse an."
						buttonText="Zu unseren Gruppen"
						buttonHref="/gruppen"
					/>
					<SocialMediaCard
						title="Unser Haus"
						description="Unser Schurwaldhaus ist ein besonders beliebtes Ausflugsziel für Wanderer, Radfahrer und Familien."
						details="Die große Terasse lädt bei tollem Wetter zum draußen sitzen ein und unser großer Naturspielplatz wie das Ziegengehege bieten auch für Kinder Unterhaltung."
						linkText="Webseite zum Schurwaldbesen"
						linkHref="http://www.schurwaldbesen.com/"
					/>
				</div>
			</section>

			<Footer />
		</div>
	);
}

function About() {
	return (
		<div className="bg-teal-200/90 text-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
			<h1 className="text-3xl sm:text-4xl font-bold m-0 p-0 mb-4">Willkommen!</h1>
			<h3 className="text-xl sm:text-2xl font-semibold m-0 p-0 mb-6">
				Ortsgruppe Plochingen-Reichenbach-Lichtenwald
			</h3>
			<p className="mt-6 leading-relaxed text-sm sm:text-base">
				Als im Jahre 1946 von einigen Männern und Frauen die Ortsgruppe der NaturFreunde gegründet wurde,
				konnten sie nicht ahnen, welchen Aufschwung diese nehmen würde. Das Vereinsleben entwickelte sich und
				ein Holzhaus auf dem Spielberg in Hegenlohe (heute Lichtenwald) wurde erstellt und mit viel Idealismus
				wurde dieses weiter ausgebaut und war fortan der Mittelpunkt des Vereinsgeschehens.
				<br />
				<br />
				Aber bald schon wurde dieses Haus zu klein.
				<br />
				<br />
				1968 wurde der Grundstein zum Bau des heutigen „Schurwaldhauses" der NaturFreunde OG
				Plochingen-Reichenbach-Lichtenwald gelegt.
				<br />
				<br />
				Weit über 17000 Arbeitsstunden Eigenleistung der Mitglieder und deren Freunde wurden erbracht,
				bevor das Haus 1971 der Öffentlichkeit übergeben wurde. Das Haus hat jetzt 44 Betten, davon 10 im
				Matratzenlager- Ein Campingplatz und ein Spielplatz sind dem Haus angegliedert.
				<br />
				Für Wanderer wurden 40 km Rundwanderwege ausgeschildert.
				<br />
				<br />
				Das Schurwaldhaus ist voll bewirtschaftet durch Verpachtung an die Fam. Haug
			</p>
		</div>
	);
}

function Info() {
	return (
		<div className="bg-blue-900/90 text-green-50 rounded-lg shadow-lg p-6 sm:p-8">
			<h1 className="text-3xl sm:text-4xl font-bold m-0 p-0 mb-4">Wir engagieren uns ...</h1>
			<ul className="mt-6 pl-0 space-y-3">
				<li className="py-1">
					für eine sozial-ökologische{' '}
					<a href="https://www.naturfreunde.de/movum-briefe-zur-transformation" className="underline">
						Transformation
					</a>{' '}
					von Politik und Gesellschaft
				</li>
				<li className="py-1">für naturnahe und bezahlbare Erholung für alle</li>
				<li className="py-1">
					im Natur- und Umweltschutz, zum Beispiel beim Engagement für den Erhalt der Biologischen Vielfalt
				</li>
				<li className="py-1">in der Umweltbildung für Kinder und Jugendliche</li>
				<li className="py-1">
					für die Energiewende, zum Beispiel beim Engagement gegen Fracking, Kohle, Atom und Bebauung von
					Landschaftsschutzgebieten
				</li>
				<li className="py-1">im Natursport, zum Beispiel bei der Ausbildung im naturfreundlichen Breitensport</li>
				<li className="py-1">
					für einen sanften Tourismus (zum Beispiel auf unseren{' '}
					<a href="https://www.naturfreunde.de/natura-trails" className="underline">
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

interface SocialMediaCardProps {
	title: string;
	description: string;
	details: string;
	hashtag?: string;
	links?: Array<{ href: string; label: string; icon: string }>;
	buttonText?: string;
	buttonHref?: string;
	linkText?: string;
	linkHref?: string;
}

function SocialMediaCard({
	title,
	description,
	details,
	hashtag,
	links,
	buttonText,
	buttonHref,
	linkText,
	linkHref,
}: SocialMediaCardProps) {
	return (
		<div className="bg-orange-500/90 text-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
			<h2 className="text-2xl sm:text-3xl font-bold mt-0 mb-4">{title}</h2>
			<p className="mb-3">{description}</p>
			<p className="mb-4 text-sm">{details}</p>

			{hashtag && <p className="mb-4 text-sm">Wir beobachten in den Kanälen alles mit dem Hashtag <b>{hashtag}</b></p>}

			{links && (
				<ul className="space-y-3 list-none m-0 p-0 mb-4">
					{links.map((link, i) => (
						<li key={i}>
							<a href={link.href} className="text-gray-800 flex items-center gap-3 hover:opacity-80">
								{link.icon === 'facebook' && (
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									</svg>
								)}
								{link.icon === 'instagram' && (
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
									</svg>
								)}
								<span className="underline">{link.label}</span>
							</a>
						</li>
					))}
				</ul>
			)}

			{buttonText && buttonHref && (
				<a
					href={buttonHref}
					className="inline-block px-6 py-3 text-center text-gray-800 bg-teal-200 no-underline transition-colors duration-500 rounded-lg hover:bg-teal-300"
				>
					{buttonText}
				</a>
			)}

			{linkText && linkHref && (
				<p className="mt-4">
					Die Webseite zum Schurwaldbesen finden sie{' '}
					<a href={linkHref} className="underline hover:opacity-80">
						hier
					</a>
				</p>
			)}
		</div>
	);
}

function Footer() {
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
