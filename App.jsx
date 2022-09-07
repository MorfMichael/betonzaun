import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from './Methods';

import Pillar from './Pillar';
import Section from './Section';

const app = () => {

	const [result, setResult] = useState([]);
	const [sum, setSum] = useState(0.0);

	const [sections, setSections] = useState([
		{ id: 1, type: 'Pillar', start: true },
		{ id: 2, type: 'Section' },
		{ id: null, type: 'Add' },
		{ id: 3, type: 'Pillar', end: true },
	])

	useEffect(() => {
		if (result) {
			setSum(result.reduce((prev, curr, i) => prev += curr.count * curr.price, 0));
		}
	}, [result]);

	const calculate = useCallback(event => {
		event.preventDefault();

		let form = Object.fromEntries(new FormData(event.target).entries());

		let c50 = Math.floor(form.height / 50);
		let rest = form.height - c50 * 50;
		let c25 = rest > 0 ? rest / 25 : 0;

		let length = Math.ceil(form.length / 2);

		c50 = c50 * length;
		c25 = c25 * length;

		let cMiddle = length - 1;
		let cEnd = 2

		let res = [];

		if (c50 > 0) {
			res.push({ label: "50er Platte", count: c50, path: "M 0 0 H 200 V 50 H 0 V 0", price: 12.59 });
		}

		if (c25 > 0) {
			res.push({ label: "25er Platte", count: c25, path: "M 0 12.5 H 200 V 37.5 H 0 V 12.5", price: 8.99 });
		}

		if (cEnd > 0) {
			res.push({ label: "Endsteher", count: cEnd, path: "M 0 5 H 30 V 15 H 10 V 35 H 30 V 45 H 0 V 5", price: 22.39 });
		}

		if (cMiddle > 0) {
			res.push({ label: "Mittelsteher", count: cMiddle, path: "M 0 5 H 60 V 15 H 40 V 35 H 60 V 45 H 60 H 0 V 35 H 20 V 15 H 0 V 5", price: 28.29 });
		}

		setResult(res);
	});

	const addSection = useCallback((index) => (event) => {
		console.log('bla');
		let ids = sections.map(x => x.id);
		let newId = Math.max(...ids) + 1;

		console.log(sections[index-1]?.type);
		if (sections[index-1]?.type == "Section") {
			sections.splice(index,0, {id: newId, type: 'Pillar' },{ id: newId+1, type: 'Section' });
		} else {
			sections.splice(index,0,{ id: newId, type: 'Section' });
		}
		setSections(sections.slice());
	});

	const removeSection = useCallback((id) => (event) => {
		setSections(sections.filter(x => x.id != id));
	});

	return (
		<div>
			{
				sections.map((section, index) =>
					<div key={index}>
						{
							{
								Pillar: <Pillar />,
								Section: <Section />,
								Add: <button onClick={addSection(index)}>Abschnitt einfügen</button>
							}[section.type]
						}
						{ section.type != 'Add' && <button disabled={section.start || section.end} onClick={removeSection(section.id)}>remove</button> }
					</div>
				)
			}
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