import { useState, useCallback } from "react";

const Section = ({ changed }) => {

	const [result, setResult] = useState([]);

	const calculate = useCallback(event => {
		event.preventDefault();

		if (changed) {
			let form = Object.fromEntries(new FormData(event.target.form).entries());
			let c50 = Math.floor(form.height / 50);
			let rest = form.height - c50 * 50;
			let c25 = rest > 0 ? rest / 25 : 0;

			let length = Math.ceil(form.length / 2);

			c50 = c50 * length;
			c25 = c25 * length;

			let cMiddle = length > 0 ? length - 1 :  0;

			let res = { 
				"Platte 200x50": c50 ,
				"Platte 200x25": c25,
				"Mittelsteher 100": 0, 
				"Mittelsteher 125": 0,
				"Mittelsteher 150": 0,
				"Mittelsteher 175": 0,
				"Mittelsteher 200": 0,
				"Mittelsteher 225": 0,
				"Mittelsteher 250": 0,
			};
			res["Mittelsteher " + form.height] = cMiddle;
			changed(res)
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