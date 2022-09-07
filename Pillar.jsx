const Pillar = () => {
	return (
		<div className="section">
			<h4>Steher</h4>
			<form>
				<p>
				<label htmlFor="material">Material: </label>
				<select id="material">
					<option value="Beton">Beton</option>
					<option value="Eisen">Eisen</option>
				</select>
				</p>

				<p>
					<label htmlFor="variant">Ausführung: </label>
					<select id="variant">
						<option value="90">90°</option>
						<option value="45">45°</option>
						<option value="25">25°</option>
					</select>
				</p> 
			</form>
		</div>
	);
}

export default Pillar;