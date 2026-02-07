import { About } from "./components/about";
import { DonationCampaigns } from "./components/donation-campaigns";
import { Footer } from "./components/footer";
import { Info } from "./components/info";
import { SocialMediaCard } from "./components/social-media-card";

export default function Home() {
	return (
		<div
			className="min-h-screen bg-emerald-50 bg-contain bg-center bg-fixed bg-no-repeat"
			style={{
				backgroundImage: `url('/nfliwa-bg.jpeg')`,
			}}
		>
			{/* Second Row: Donation Campaigns */}
			<section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="max-w-7xl mx-auto bg-yellow-100/90 rounded-lg shadow-lg">
					<DonationCampaigns />
				</div>
			</section>

			{/* First Row: About and Info */}
			<section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
					<About />
					<Info />
				</div>
			</section>

			{/* Third Row: Social Media */}
			<section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
					<SocialMediaCard
						title="Social Media"
						description="Egal ob auf Facebook oder Instagram."
						details="Verfolge unsere Aktivitäten oder verlinke uns bei deinen Aktivitäten rund um unser NaturFreunde-Haus."
						hashtag="#naturfreundelichtenwald"
						links={[
							{
								href: "https://fb.me/naturfreundelichtenwald",
								label: "@naturfreundelichtenwald auf Facebook",
								icon: "facebook",
							},
							{
								href: "https://instagram.com/naturfreundelichtenwald",
								label: "@naturfreundelichtenwald auf Instagram",
								icon: "instagram",
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
