import { useState, useCallback } from 'react';

const Pillar = ({ changed, section, products }) => {

	const [error, setError] = useState('');
	const [result, setResult] = useState({});

	const calculate = useCallback((event) => {
		setError(false);
		let form = Object.fromEntries(new FormData(event.target.form).entries());

		let product = products.find(x => x.type == "Pillar" && x.properties.height == form.height && x.properties.material == form.material && x.properties.variant == form.variant);

		if (product) {
			let res = {}
			if (form.count > 0) res[product.id] = Number(form.count);
			setResult(res);
			section.result = res;
			changed();
		} else {
			section.result = {};
			setResult({});
			setError('no pillar found!');
			changed();
		}
	})

	return (
		<div className={`section ${error ? 'error' : ''}`}>
			<h4>Steher</h4>
			<form onChange={calculate}>
				<p>
					<label htmlFor="material">Material: </label>
					<select id="material" name="material">
						<option value="Beton">Beton</option>
						<option value="Eisen">Eisen</option>
					</select>
				</p>

				<p>
					<label htmlFor="variant">Ausführung: </label>
					<select id="variant" name="variant">
						<option value="Endsteher">Endsteher</option>
						<option value="Mittelsteher">Mittelsteher</option>
						<option value="90">90°</option>
						<option value="45">45°</option>
					</select>
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

				<p>
					<label htmlFor="count">Anzahl: </label>
					<input id="count" name="count" type="number" min="1" max="20" step="1" />
				</p>
			</form>
			<p>
				{ JSON.stringify(result) }
			</p>
			{error && 
			<p>
				{error}
			</p>}
		</div>
	);
}

export default Pillar;