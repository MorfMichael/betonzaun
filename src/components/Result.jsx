import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { formatCurrency } from '../misc/Methods';

export default ({products, elements}) => {

  const [result, setResult] = useState([]);
	const [sum, setSum] = useState(0.0);

	useEffect(() => {
		if (result) {
			setSum(result.reduce((prev, curr) => prev += curr.count * curr.price, 0));
		}
	}, [result]);

  const update = useCallback(() => {
    console.log('i am here!');
    let res = elements.reduce((prev, cur) => {
			Object.keys(cur.result).forEach(key => prev[key] ? prev[key] += cur.result[key] : prev[key] = cur.result[key]);
			return prev;
		}, {});

		let result = []
		Object.keys(res).forEach(x => {
			let prod = products.find(p => p.id == x);
			if (prod) {
				result.push({ ...prod, count: res[x] });
			}
		});
		setResult(result);
  });

  return (
    <div className="result-container">
      <h2>Ergebnis</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Beschreibung</TableCell>
              <TableCell align="right">Anzahl</TableCell>
              <TableCell align="right">Einzelpreis</TableCell>
              <TableCell align="right">Preis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{formatCurrency(row.price)}</TableCell>
                <TableCell align="right">{formatCurrency(row.price * row.count)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
			<div>
				<h1>Summe: {formatCurrency(sum)}</h1>
			</div>
    </div>
  );
};
