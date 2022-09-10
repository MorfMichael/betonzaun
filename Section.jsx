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

const Section = ({ changed, section, products }) => {

	const calculate = useCallback(event => {
		event.preventDefault();

		if (changed) {
			let form = Object.fromEntries(new FormData(event.target.form).entries());
			let count = calculatePlates(form.height, form.length);

			let pillar = products.find(x => x.type == "Pillar" && x.properties.height == form.height && x.properties.variant == "Mittelsteher" && x.properties.material == "Beton");
			let plate50 = products.find(x => x.type == "Plate" && x.properties.height == 50 && x.properties.material == "Beton" && x.properties.pattern == "Steinoptik");
			let plate25 = products.find(x => x.type == "Plate" && x.properties.height == 25 && x.properties.material == "Beton" && x.properties.pattern == "Steinoptik");

			let result = {};
			result[plate50.id] = count.plate50;
			result[plate25.id] = count.plate25;
			result[pillar.id] = count.pillars;
			section.result = result;
			changed(section);
		}
	});

	return (
		<div className="section">
			<h4>Abschnitt</h4>
			<form onChange={calculate} method="POST">
				<p>
					<label htmlFor="length">Länge: </label>
					<input type="number" id="length" name="length" min=".5" max="50" step=".1" /> m
				</p>
				<p>
					<label htmlFor="height">Höhe: </label>
					<select id="height" name="height">
						<option value="100">1,00 m</option>
						<option value="125">1,25 m</option>
						<option value="150">1,50 m</option>
						<option value="175">1,75 m</option>
						<option value="200">2,00 m</option>
						<option value="225">2,25 m</option>
						<option value="250">2,50 m</option>
					</select>
				</p>
			</form>
		</div>
	);
}

export default Section;