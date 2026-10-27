"use client";

const komootTours = [
	{
		url: "https://www.komoot.com/de-de/tour/3367828137?share_token=a45W746qvOL6Wjlm3JGkQ9UK8XDae7zExqNa67Ta9QZfoLSnJh",
		image:
			"https://www.komoot.com/tour/3367828137/embed?share_token=a45W746qvOL6Wjlm3JGkQ9UK8XDae7zExqNa67Ta9QZfoLSnJh&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367826221?share_token=a75g3eqDGnFgIv2Wkedfiiqdxg7UO5oN05o7TQgNGQUS4xONpB",
		image:
			"https://www.komoot.com/tour/3367826221/embed?share_token=a75g3eqDGnFgIv2Wkedfiiqdxg7UO5oN05o7TQgNGQUS4xONpB&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367825000?share_token=alXn3iZkKQnyA7IVcuvvxM4A6KWF0zca8HcOCMSeSs0Tq1cL72",
		image:
			"https://www.komoot.com/tour/3367825000/embed?share_token=alXn3iZkKQnyA7IVcuvvxM4A6KWF0zca8HcOCMSeSs0Tq1cL72&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367823647?share_token=aEzkQiCkYuYS6n4vyDmJCxFQ85ITkS8ziZi8OT55L1ANOQ6Mru",
		image:
			"https://www.komoot.com/tour/3367823647/embed?share_token=aEzkQiCkYuYS6n4vyDmJCxFQ85ITkS8ziZi8OT55L1ANOQ6Mru&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367823167?share_token=aslmOHpIYTjtb5iRTwDv1Vh3jZm1UnBip9Xcv58Nr0cCSmnrO0",
		image:
			"https://www.komoot.com/tour/3367823167/embed?share_token=aslmOHpIYTjtb5iRTwDv1Vh3jZm1UnBip9Xcv58Nr0cCSmnrO0&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367822644?share_token=aAE0PHaEFQ7hDdF0TO4F5nZ3JaVI7OnHtRH9L0XVVTm8PiS0PM",
		image:
			"https://www.komoot.com/tour/3367822644/embed?share_token=aAE0PHaEFQ7hDdF0TO4F5nZ3JaVI7OnHtRH9L0XVVTm8PiS0PM&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367818880?share_token=a0JsuRIp5IkdoAStIT1b1YbnWzN8GRinmYBkratEt7qq43wYck",
		image:
			"https://www.komoot.com/tour/3367818880/embed?share_token=a0JsuRIp5IkdoAStIT1b1YbnWzN8GRinmYBkratEt7qq43wYck&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367813233?share_token=a8KIZQIvRAEBsK3QeMDR6nQRaq8nFGKxF3hmmW0v267vz889VE",
		image:
			"https://www.komoot.com/tour/3367813233/embed?share_token=a8KIZQIvRAEBsK3QeMDR6nQRaq8nFGKxF3hmmW0v267vz889VE&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
	{
		url: "https://www.komoot.com/de-de/tour/3367811540?share_token=aWVEMyn3xNxljblzTLj7wKQBKxkPIqOIb4tYeaPpCTysUkEJmG",
		image:
			"https://www.komoot.com/tour/3367811540/embed?share_token=aWVEMyn3xNxljblzTLj7wKQBKxkPIqOIb4tYeaPpCTysUkEJmG&amp;hl=de&amp;layout=classic&amp;profile=1&amp;line=4f6814&amp;width=100%25&amp;height=700&amp;image=1&amp;hm=true",
	},
];

export default function HikesPage() {
	return (
		<section className="p-4 sm:p-8 lg:p-12 pt-4 max-w-6xl mx-auto">
			<div>
				<h3 className="text-gray-800 text-3xl font-bold mb-6">Wanderwege</h3>

				<p className="mb-6">
					Unsere ausgewählten Wanderwege rund um unser Schurwaldhaus.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
					{komootTours.map((tour) => (
						<div key={tour.url} className="w-full overflow-hidden rounded-lg">
							<a
								href={tour.url}
								target="_blank"
								rel="nofollow noopener noreferrer"
								className="block w-full"
							>
								<iframe
									src={tour.image}
									title="Komoot Wanderweg"
									className="block w-full rounded-lg border-0"
									style={{ height: "420px" }}
									loading="lazy"
									scrolling="no"
									allowFullScreen
								/>
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
