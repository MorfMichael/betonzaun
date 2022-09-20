import { useState, useCallback, useEffect } from "react";
import { TextField, MenuItem, IconButton, Select, FormControl, InputLabel } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeCircleRounded } from "@mui/icons-material";

const calculatePlates = (height, length) => {
	let plate50 = Math.floor(height / 50);
	let rest = height - plate50 * 50;
	let plate25 = rest > 0 ? rest / 25 : 0;

	let l = Math.ceil(length / 2);

	plate50 = plate50 * l;
	plate25 = plate25 * l;

	let pillars = l > 0 ? l - 1 : 0;

	return { plate50, plate25, pillars };
}

const options = [
	{ value: 100, label: "1,00 m" },
	{ value: 125, label: "1,25 m" },
	{ value: 150, label: "1,50 m" },
	{ value: 175, label: "1,75 m" },
	{ value: 200, label: "2,00 m" },
	{ value: 225, label: "2,25 m" },
	{ value: 250, label: "2,50 m" },
]

const Section = ({ changed, section, products, remove }) => {

	const [state, setState] = useState({
		length: 10,
		height: 200,
	});

	const [error, setError] = useState('');

	const handleChange = useCallback(event => {
		state[event.target.name] = event.target.value;
		setState({ ...state });
	});

	const calculate = useCallback(() => {
		setError('');
		let count = calculatePlates(state.height, state.length);

		let pillar = products.find(x => x.type == "Pillar" && x.properties.height == state.height && x.properties.variant == "Mittelsteher" && x.properties.material == "Beton");
		let plate50 = products.find(x => x.type == "Plate" && x.properties.height == 50 && x.properties.material == "Beton" && x.properties.pattern == "Steinoptik");
		let plate25 = products.find(x => x.type == "Plate" && x.properties.height == 25 && x.properties.material == "Beton" && x.properties.pattern == "Steinoptik");

		if (!pillar) {
			setError('no pillar found!');
			return;
		}

		if (!plate50) {
			setError('no plate50 found!');
			return;
		}

		if (!plate25) {
			setError('no plate25 found!');
			return;
		}

		let res = {};
		if (count.plate50 > 0) res[plate50.id] = count.plate50;
		if (count.plate25 > 0) res[plate25.id] = count.plate25;
		if (count.pillars > 0) res[pillar.id] = count.pillars;

		section.result = res;
		changed();
	});

	useEffect(() => {
		calculate();
	}, [state]);

	return (
		<div className={`section ${error ? 'error' : ''} `}>
			<div className="flex-center">
				<span className="label">Abschnitt</span>

				<TextField
					id="length" type="number" variant="outlined" label="L&auml;nge"
					name="length" min=".5" max="200" step=".1" size="small" style={{ width: "100px" }}
					value={state.length} onChange={handleChange} /> m


				<TextField
					id="height" name="height" select style={{ width: "100px" }}
					variant="outlined" label="H&ouml;he" defaultValue={100} size="small" value={state.height} onChange={handleChange}>
					{options.map((x, i) => <MenuItem key={x.value} value={x.value}>{x.label}</MenuItem>)}
				</TextField>

				<IconButton aria-label="delete" onClick={remove(section.id)}>
					<DeleteIcon />
				</IconButton>
			</div>
			{error &&
				<div className="error-text">
					{error}
				</div>
			}
		</div>
	);
}

export default Section;