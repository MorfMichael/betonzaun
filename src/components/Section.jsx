import { TextField, MenuItem, Button, Card, CardHeader, CardContent, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useCallback, useEffect } from "react";

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

const Section = ({ changed, section, products, remove }) => {

	const calculate = useCallback(event => {
		event.preventDefault();

		if (changed) {
			let form = Object.fromEntries(new FormData(event.target.form).entries());
			let count = calculatePlates(form.height, form.length);

			let pillar = products.find(x => x.type == "Pillar" && x.properties.height == form.height && x.properties.variant == "Mittelsteher" && x.properties.material == "Beton");
			let plate50 = products.find(x => x.type == "Plate" && x.properties.height == 50 && x.properties.material == "Beton" && x.properties.pattern == "Steinoptik");
			let plate25 = products.find(x => x.type == "Plate" && x.properties.height == 25 && x.properties.material == "Beton" && x.properties.pattern == "Steinoptik");

			let res = {};
			if (count.plate50 > 0) res[plate50.id] = count.plate50;
			if (count.plate25 > 0) res[plate25.id] = count.plate25;
			if (count.pillars > 0) res[pillar.id] = count.pillars;

			section.result = res;
			changed();
		}
	});

	return (
		<div className="section">
			<form onSubmit={calculate} method="POST" className="flex-center">

				<span className="label">Abschnitt</span>

				<TextField
					id="length" type="number" variant="outlined"
					label="L&auml;nge"
					name="length" min=".5" max="200" step=".1" size="small" style={{ width: "100px" }} /> m

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

				<IconButton aria-label="delete" onClick={remove(section.id)}>
					<DeleteIcon />
				</IconButton>
			</form>
		</div>
	);
}

export default Section;