import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from './Methods';

import Products from './Products';

import Pillar from './Pillar';
import Section from './Section';

const App = () => {

	const [result, setResult] = useState([]);
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

		setElements(elements.concat({ id: newId, type: insertType }));
		setInsertType(null);
	}, [insertType]);

	const removeSection = useCallback((id) => (event) => {
		setElements(elements.filter(x => x.id != id));
	});

	const calculate = useCallback(res => {
		console.log(elements);
	});


	return (
		<div>
			{
				elements.map(section =>
					<div key={section.id}>
						{
							{
								Pillar: <Pillar changed={calculate} section={section} products={Products} />,
								Section: <Section changed={calculate} section={section} products={Products} />,
							}[section.type]
						}
						<button onClick={removeSection(section.id)}>remove</button>
					</div>
				)
			}
			<select onChange={e => setInsertType(e.target.value || null)} value={insertType || ''}>
				<option value="">&lt;Einf&uuml;gen&gt;</option>
				<option value="Pillar">Steher</option>
				<option value="Section">Abschnitt</option>
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

export default App;