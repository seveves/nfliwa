"use client";

import { useEffect, useRef } from "react";

export function DonationCampaigns() {
	const container1 = useRef<HTMLDivElement>(null);
	const container2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (container1.current && container1.current.children.length === 0) {
			const iframe = document.createElement("iframe");
			iframe.title = "wirwunder Spendenwidget";
			iframe.src =
				"https://project-widget.betterplace.org/projects/150624?l=de&wirwunder=true&client=ww-kreissparkasse-esslingen-nuertingen";
			iframe.width = "320";
			iframe.height = "320";
			iframe.style.border = "0";
			iframe.style.padding = "0";
			iframe.style.margin = "0";
			container1.current.appendChild(iframe);
		}

		if (container2.current && container2.current.children.length === 0) {
			const iframe = document.createElement("iframe");
			iframe.title = "wirwunder Spendenwidget";
			iframe.src =
				"https://project-widget.betterplace.org/projects/169061?l=de&wirwunder=true&client=ww-kreissparkasse-esslingen-nuertingen";
			iframe.width = "320";
			iframe.height = "320";
			iframe.style.border = "0";
			iframe.style.padding = "0";
			iframe.style.margin = "0";
			container2.current.appendChild(iframe);
		}
	}, []);

	return (
		<>
			<h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center pt-6 sm:pt-8 mb-3">
				Aktuelle Spendenkampagnen
			</h2>
			<h3 className="text-xl sm:text-2xl font-semibold text-center m-0 p-0 mb-0">
				Unterstüzt unsere aktuellen Projekte auf wirwunder.de
			</h3>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8">
				<div className="justify-items-center" ref={container1} />
				<div className="justify-items-center" ref={container2} />
			</div>
		</>
	);
}
