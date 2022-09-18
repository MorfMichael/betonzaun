import { useState, useCallback } from 'react';
import { TextField, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Pillar = ({ changed, section, products, remove }) => {

	const [error, setError] = useState('');

	const calculate = useCallback((event) => {
		setError(false);
		let form = Object.fromEntries(new FormData(event.target.form).entries());

		let product = products.find(x => x.type == "Pillar" && x.properties.height == form.height && x.properties.material == form.material && x.properties.variant == form.variant);

		if (product) {
			let res = {}
			if (form.count > 0) res[product.id] = Number(form.count);
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
			<form onChange={calculate} className="flex-center">
				<span className="label">Steher</span>
				<TextField
					id="material" name="material" select stlye={{ width: "300px" }}
					variant="outlined" label="Material" defaultValue="Beton" size="small">
					<MenuItem value="Beton">Beton</MenuItem>
					<MenuItem value="Eisen">Eisen</MenuItem>
				</TextField>

				<TextField
					id="variant" name="variant" label="Ausf&uuml;hrung" size="small" select
					style={{ width: "200px" }} defaultValue="Endsteher">
					<MenuItem value="Endsteher">Endsteher</MenuItem>
					<MenuItem value="Mittelsteher">Mittelsteher</MenuItem>
					<MenuItem value="90">90°</MenuItem>
					<MenuItem value="45">45°</MenuItem>
				</TextField>

				<TextField
					id="height" name="height" select style={{ width: "100px" }}
					variant="outlined" label="H&ouml;he" defaultValue={100} size="small">
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
					name="count" min="1" max="50" step="1" size="small" style={{ width: "100px" }} />

				<IconButton aria-label="delete" onClick={remove(section.id)}>
					<DeleteIcon />
				</IconButton>
			</form>
			{error &&
				<p>
					{error}
				</p>}
		</div>
	);
}

export default Pillar;