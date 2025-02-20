import { useCallback, useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import logo from './images/logo.png';

import Products from './misc/Products';
import Pillar from './components/Pillar';
import Plate from './components/Plate';
import Section from './components/Section';
import Result from './components/Result';

const limit = 5;

const App = () => {
	const [canAdd, setCanAdd] = useState(true);
	const [elements, setElements] = useState([
		{ id: 1, type: 'Pillar', result: {} },
		{ id: 2, type: 'Section', result: {} },
		{ id: 3, type: 'Pillar', result: {} },
	])
	const [result,setResult] = useState({});

	useEffect(() => {
		setCanAdd(elements.length < limit);
		updateResult();
	}, [elements])

	const addElement = useCallback(type => {
		let ids = elements.map(x => x.id);
		let newId = (ids.length > 0 ? Math.max(...elements.map(x => x.id)) : 0) + 1;

		setElements(elements.concat({ id: newId, type: type, result: {} }));
	});

	const removeElement = useCallback((id) => {
		setElements(elements.filter(x => x.id != id));
	});

	const updateResult = useCallback(() => {
		let res = elements.reduce((prev, cur) => {
      Object.keys(cur.result).forEach(key => prev[key] ? prev[key] += cur.result[key] : prev[key] = cur.result[key]);
      return prev;
    }, {});
		setResult(res);
	});

	return (
		<div className="main">
			<div className="header">
				<h2>Betonzaunrechner</h2>
				<img src={logo} className="header-logo" />
			</div>

			{
				elements.map(section =>
						(
							{
								Pillar: <Pillar key={section.id} changed={updateResult} section={section} products={Products} remove={removeElement} />,
								Plate: <Plate key={section.id} changed={updateResult} section={section} products={Products} remove={removeElement} />,
								Section: <Section key={section.id} changed={updateResult} section={section} products={Products} remove={removeElement} />,
							}[section.type]
						)
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

			<Result products={Products} data={result} />
		</div>
	);
}

export default App;
