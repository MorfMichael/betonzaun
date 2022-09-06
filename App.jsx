import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from './Methods';

const app = () => {

	const [result, setResult] = useState([]);
	const [sum, setSum] = useState(0.0);

	useEffect(() => {
		if (result) {
			setSum(result.reduce((prev, curr, i) => prev += curr.count * curr.price, 0));
		}
	}, [result]);

	const calculate = useCallback(event => {
		event.preventDefault();

		let form = Object.fromEntries(new FormData(event.target).entries());

		let c50 = Math.floor(form.height / 50);
		let rest = form.height - c50 * 50;
		let c25 = rest > 0 ? rest / 25 : 0;

		let length = Math.ceil(form.length / 2);

		c50 = c50 * length;
		c25 = c25 * length;

		let cMiddle = length - 1;
		let cEnd = 2

		let res = [];

		if (c50 > 0) {
			res.push({ label: "50er Platte", count: c50, path: "M 0 0 H 200 V 50 H 0 V 0", price: 12.59 });
		}
		 
		if (c25 > 0) {
			res.push({ label: "25er Platte", count: c25, path: "M 0 12.5 H 200 V 37.5 H 0 V 12.5", price: 8.99 });
		}

		if (cEnd > 0 ) {
			res.push({ label: "Endsteher", count: cEnd, path: "M 0 5 H 30 V 15 H 10 V 35 H 30 V 45 H 0 V 5", price: 22.39 });
		}

		if (cMiddle > 0) {
			res.push({ label: "Mittelsteher", count: cMiddle, path: "M 0 5 H 60 V 15 H 40 V 35 H 60 V 45 H 60 H 0 V 35 H 20 V 15 H 0 V 5", price: 28.29 });
		}

		setResult(res);
	});

	return (
		<div>
			<form onSubmit={calculate} method="POST">
				<p>
					<label htmlFor="length">Länge: </label>
					<input type="number" id="length" name="length" min=".5" max="50" step=".5" /> m
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
					<input type="submit" value="Berechnen" />
				</p>
			</form>
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

export default app;