import { useState, useCallback, useEffect } from 'react';
import { TextField, MenuItem, IconButton, FormControl, Select, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Plate = ({ changed, section, products, remove }) => {

	const [state, setState] = useState(
		{
			material: 'Beton',
			pattern: 'Steinoptik',
			height: 50,
			count: 1,
		});

	const [error, setError] = useState('');
	const [removed,setRemoved] = useState(false);

	const handleChange = useCallback(event => {
		state[event.target.name] = event.target.value;
		setState({ ...state });
	});

	useEffect(() => {
		calculate();
	}, [state]);

	const calculate = useCallback(() => {
		setError(false);

		let product = products.find(x => x.type == "Plate" && x.properties.height == state.height && x.properties.material == state.material && x.properties.pattern == state.pattern);

		if (product) {
			let res = {}
			if (state.count > 0) res[product.id] = Number(state.count);
			section.result = res;
			changed();
		} else {
			section.result = {};
			setError('Keine Platte gefunden!');
			changed();
		}
	})

	const _remove = useCallback(() => {
		setRemoved(true);
		setTimeout(() => remove(section.id), 500);
	});

  return (
    <div className={['section', error && 'error', removed && 'remove'].filter(Boolean).join(' ')}>
      <div className="flex-center">
        <span className="label">Platte</span>
        <TextField
          id="material" name="material" select stlye={{ width: "300px" }}
          variant="outlined" label="Material" defaultValue="Beton" size="small" value={state.material} onChange={handleChange}>
          <MenuItem value="Beton">Beton</MenuItem>
          <MenuItem value="Eisen">Eisen</MenuItem>
        </TextField>

        <TextField
          id="pattern" name="pattern" label="Muster" size="small" select
          style={{ width: "200px" }} defaultValue="Steinoptik" value={state.pattern} onChange={handleChange}>
          <MenuItem value="Steinoptik">Steinoptik</MenuItem>
          <MenuItem value="Glatt">Glatt</MenuItem>
        </TextField>

        <TextField
          id="height" name="height" style={{ width: "100px" }}
          variant="outlined" select label="H&ouml;he"
          defaultValue={50} size="small" value={state.height} onChange={handleChange}>
          <MenuItem value={25}>0,25 m</MenuItem>
          <MenuItem value={50}>0,50 m</MenuItem>
        </TextField>

        <TextField
          id="count" type="number" variant="outlined" label="Anzahl"
          name="count" min="1" max="50" step="1" size="small" style={{ width: "100px" }}
          value={state.count} onChange={handleChange} />

        <IconButton aria-label="delete" onClick={_remove}>
          <DeleteIcon />
        </IconButton>
      </div>
      {error &&
        <div className="error-text">
          {error}
        </div>}
    </div>
  );
};

export default Plate;