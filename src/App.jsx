import { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency } from './misc/Methods';


import Products from './misc/Products';

import Pillar from './components/Pillar';
import Section from './components/Section';

const limit = 5;

const App = () => {

	const [result, setResult] = useState([]);
	const [sum, setSum] = useState(0.0);

	const [insertType, setInsertType] = useState(null);

	const [elements, setElements] = useState([
		{ id: 1, type: 'Pillar', result: {} },
		{ id: 2, type: 'Section', result: {} },
		{ id: 3, type: 'Pillar', result: {} },
	])

	const [canAdd, setCanAdd] = useState(true);

	useEffect(() => {
		if (result) {
			setSum(result.reduce((prev, curr, i) => prev += curr.count * curr.price, 0));
		}
	}, [result]);

	useEffect(() => {
		update();
		console.log(elements.length),
			setCanAdd(elements.length < limit);
	}, [elements])

	useEffect(() => {
		if (!insertType) return;

		let ids = elements.map(x => x.id);
		let newId = (ids.length > 0 ? Math.max(...elements.map(x => x.id)) : 0) + 1;

		setElements(elements.concat({ id: newId, type: insertType, result: {} }));
		setInsertType(null);
	}, [insertType]);

	const removeSection = useCallback((id) => (event) => {
		setElements(elements.filter(x => x.id != id));
	});

	const update = useCallback(() => {
		let res = elements.reduce((prev, cur) => {
			Object.keys(cur.result).forEach(key => prev[key] ? prev[key] += cur.result[key] : prev[key] = cur.result[key]);
			return prev;
		}, {});

		let result = []
		Object.keys(res).forEach(x => {
			let prod = Products.find(p => p.id == x);
			if (prod) {
				result.push({ ...prod, count: res[x] });
			}
		});
		setResult(result);
	});

	const addElement = useCallback(type => {
		let ids = elements.map(x => x.id);
		let newId = (ids.length > 0 ? Math.max(...elements.map(x => x.id)) : 0) + 1;

		setElements(elements.concat({ id: newId, type: type, result: {} }));
	});



	return (
		<div className="main">
			{
				elements.map(section =>
					<div key={section.id}>
						{
							{
								Pillar: <Pillar changed={update} section={section} products={Products} remove={removeSection} />,
								Section: <Section changed={update} section={section} products={Products} remove={removeSection} />,
							}[section.type]
						}
					</div>
				)
			}
			{canAdd &&
				<div className="add-section">
					<Button variant="contained" startIcon={<AddIcon />} onClick={() => addElement('Pillar')} disabled={!canAdd}>Steher</Button>
					<Button variant="contained" startIcon={<AddIcon />} onClick={() => addElement('Plate')} disabled={!canAdd}>Platte</Button>
					<Button variant="contained" startIcon={<AddIcon />} onClick={() => addElement('Section')} disabled={!canAdd}>Abschnitt</Button>
				</div>
			}
			{!canAdd && <h4 className="add-error">Maximalanzahl ({limit}) erreicht!</h4>}
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