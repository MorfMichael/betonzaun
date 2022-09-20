import { useState, useCallback, useEffect } from 'react';
import { TextField, MenuItem, IconButton, FormControl, Select, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Pillar = ({ changed, section, products, remove }) => {

	const [state, setState] = useState(
		{
			material: 'Beton',
			variant: 'Endsteher',
			height: 100,
			count: 1,
		});

	const [error, setError] = useState('');

	const handleChange = useCallback(event => {
		state[event.target.name] = event.target.value;
		setState({ ...state });
	});

	useEffect(() => {
		calculate();
	}, [state]);

	const calculate = useCallback(() => {
		setError(false);

		let product = products.find(x => x.type == "Pillar" && x.properties.height == state.height && x.properties.material == state.material && x.properties.variant == state.variant);

		if (product) {
			let res = {}
			if (state.count > 0) res[product.id] = Number(state.count);
			section.result = res;
			changed();
		} else {
			section.result = {};
			setError('no pillar found!');
			changed();
		}
	})

	return (
		<div className={`section ${error ? 'error' : ''}`}>
			<div className="flex-center">
				<span className="label">Steher</span>
				<TextField
					id="material" name="material" select stlye={{ width: "300px" }}
					variant="outlined" label="Material" defaultValue="Beton" size="small" value={state.material} onChange={handleChange}>
					<MenuItem value="Beton">Beton</MenuItem>
					<MenuItem value="Eisen">Eisen</MenuItem>
				</TextField>

				<TextField
					id="variant" name="variant" label="Ausf&uuml;hrung" size="small" select
					style={{ width: "200px" }} defaultValue="Endsteher" value={state.variant} onChange={handleChange}>
					<MenuItem value="Endsteher">Endsteher</MenuItem>
					<MenuItem value="Mittelsteher">Mittelsteher</MenuItem>
					<MenuItem value="90">90°</MenuItem>
					<MenuItem value="45">45°</MenuItem>
				</TextField>

				<TextField
					id="height" name="height" style={{ width: "100px" }}
					variant="outlined" select label="H&ouml;he"
					defaultValue={100} size="small" value={state.height} onChange={handleChange}>
					<MenuItem value={100}>1,00 m</MenuItem>
					<MenuItem value={125}>1,25 m</MenuItem>
					<MenuItem value={150}>1,50 m</MenuItem>
					<MenuItem value={175}>1,75 m</MenuItem>
					<MenuItem value={200}>2,00 m</MenuItem>
					<MenuItem value={225}>2,25 m</MenuItem>
					<MenuItem value={250}>2,50 m</MenuItem>
				</TextField>

				<TextField
					id="count" type="number" variant="outlined" label="Anzahl"
					name="count" min="1" max="50" step="1" size="small" style={{ width: "100px" }}
					value={state.count} onChange={handleChange} />

				<IconButton aria-label="delete" onClick={remove(section.id)}>
					<DeleteIcon />
				</IconButton>
			</div>
			{error &&
				<div className="error-text">
					{error}
				</div>}
		</div>
	);
}

export default Pillar;