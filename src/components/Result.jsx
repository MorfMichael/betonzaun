import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { formatCurrency } from '../misc/Methods';

export default ({ products, data }) => {

  const [result, setResult] = useState([]);
  const [sum, setSum] = useState(0.0);

  useEffect(() => {
    if (result) {
      setSum(result.reduce((prev, curr) => prev += curr.count * curr.price, 0));
    }
  }, [result]);

  useEffect(() => {
    if (!data) return;

    let result = []
    Object.keys(data).forEach(x => {
      let prod = products.find(p => p.id == x);
      if (prod) {
        result.push({ ...prod, count: data[x] });
      }
    });
    setResult(result);
  }, [data]);

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
            <TableRow>
              <TableCell><h3>Summe</h3></TableCell>
              <TableCell align="right" colSpan={3}><h2>{formatCurrency(sum)}</h2></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
