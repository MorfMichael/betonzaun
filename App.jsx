import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from './Methods';

import Pillar from './Pillar';
import Section from './Section';

const app = () => {

	const [result, setResult] = useState([]);
	const [counts,setCounts] = useState({
		"Platte 200x50": 0,
		"Platte 200x25": 0,
		"Mittelsteher 100": 0,
		"Mittelsteher 125": 0,
		"Mittelsteher 150": 0,
		"Mittelsteher 175": 0,
		"Mittelsteher 200": 0,
		"Mittelsteher 225": 0,
		"Mittelsteher 250": 0,
		"Endsteher": 0,
	});
	const [sum, setSum] = useState(0.0);

	const [insertType, setInsertType] = useState(null);

	const [elements, setElements] = useState([
		{ id: 1, type: 'Pillar' },
		{ id: 2, type: 'Section' },
		{ id: 3, type: 'Pillar' },
	])

	useEffect(() => {
		if (result) {
			setSum(result.reduce((prev, curr, i) => prev += curr.count * curr.price, 0));
		}
	}, [result]);

	useEffect(() => {
		if (!insertType) return;

		let ids = elements.map(x => x.id);
		let newId = (ids.length > 0 ? Math.max(...elements.map(x => x.id)) : 0) + 1 ;

		setElements(elements.concat({ id: newId, type: event.target.value }));
		setInsertType(null);
	}, [insertType]);

	useEffect(() => {
		console.log(counts);
	},[counts])

	const removeSection = useCallback((id) => (event) => {
		setElements(elements.filter(x => x.id != id));
	});

	const calculate = useCallback(res => {
		setCounts({ ...counts, ...res });
	});


	return (
		<div>
			{
				elements.map((section) =>
					<div key={section.id}>
						{
							{
								Pillar: <Pillar changed={calculate} />,
								Section: <Section changed={calculate} />,
							}[section.type]
						}
						{section.type != 'Add' && <button disabled={section.start || section.end} onClick={removeSection(section.id)}>remove</button>}
					</div>
				)
			}
			<select onChange={e => setInsertType(e.target.value || null)} value={insertType || ''}>
				<option value="">&lt;Einf&uuml;gen&gt;</option>
				<option value="Section">Abschnitt</option>
				<option value="Pillar">Steher</option>
			</select><br />
			<button onClick={calculate}>berechnen</button>
			<table border="0" cellSpacing="0">
				<thead>
					<tr>
						<th>Beschreibung</th>
						<th>Anzahl</th>
						<th>Abbildung</th>
						<th>Einzelpreis</th>
						<th>Preis</th>
					</tr>
				</thead>
				<tbody>
					{result.map((entry, i) =>
						<tr key={i}>
							<td>{entry.label}</td>
							<td>{entry.count} Stk.</td>
							<td><svg height="50"><path stroke="black" strokeWidth="1" fill="none" d={entry.path} /></svg></td>
							<td><h3>{formatCurrency(entry.price)}</h3></td>
							<td><h3>{formatCurrency(entry.price * entry.count)}</h3></td>
						</tr>
					)}
				</tbody>
			</table>
			<hr />
			<div>
				<h1>Summe: {formatCurrency(sum)}</h1>
			</div>
		</div>
	);
}

export default app;