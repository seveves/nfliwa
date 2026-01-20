'use client';

import { useState, useEffect } from 'react';

const months = {
	0: 'Januar',
	1: 'Februar',
	2: 'März',
	3: 'April',
	4: 'Mai',
	5: 'Juni',
	6: 'Juli',
	7: 'August',
	8: 'September',
	9: 'Oktober',
	10: 'November',
	11: 'Dezember',
};

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;
const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;

interface PrettyDateProps {
	date: string | Date;
}

export default function PrettyDate({ date }: PrettyDateProps) {
	const [prettyDate, setPrettyDate] = useState('');

	useEffect(() => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		const delta = Math.round((Date.now() - dateObj.getTime()) / 1000);
		let formatted = '';

		if (delta < 30) {
			formatted = 'Gerade eben';
		} else if (delta < MINUTE_IN_SECONDS) {
			formatted = `Vor ${delta} Sekunden.`;
		} else if (delta < 2 * MINUTE_IN_SECONDS) {
			formatted = 'Vor einer Minute';
		} else if (delta < HOUR_IN_SECONDS) {
			formatted = `Vor ${Math.floor(delta / MINUTE_IN_SECONDS)} Minuten`;
		} else if (Math.floor(delta / HOUR_IN_SECONDS) === 1) {
			formatted = 'Vor einer Stunde';
		} else if (delta < DAY_IN_SECONDS) {
			formatted = `Vor ${Math.floor(delta / HOUR_IN_SECONDS)} Stunden`;
		} else if (delta < DAY_IN_SECONDS * 2) {
			formatted = 'Gestern';
		} else {
			formatted = `Am ${dateObj.getUTCDate()}. ${months[dateObj.getUTCMonth() as keyof typeof months]} ${dateObj.getUTCFullYear()}`;
		}

		setPrettyDate(formatted);
	}, [date]);

	return <span>{prettyDate}</span>;
}
