import { useCallback } from "react";

const Section = () => {

	const calculate = useCallback(() => { });

	return (
		<div className="section">
			<h4>Abschnitt</h4>
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
			</form>
		</div>
	);
}

export default Section;