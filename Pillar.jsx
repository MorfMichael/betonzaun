import { useCallback } from 'react';

const Pillar = ({ changed }) => {

	const calculate = useCallback((event) => {
		let form = Object.fromEntries(new FormData(event.target.form).entries());
	})

	return (
		<div className="section">
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
						<option value="end">Endsteher</option>
						<option value="center">Mittelsteher</option>
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
			</form>
		</div>
	);
}

export default Pillar;