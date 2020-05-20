import React, { RefObject } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CryptoRate, CryptoHistoryRate } from '../../redux/types';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { CryptoTableChart } from './CryptoTableChart';

const arrow = {
  NO_CHANGE: null,
  UP: <ArrowUpwardIcon />,
  DOWN: <ArrowDownwardIcon />,
};

type PropsTypes = {
  items: Array<CryptoRate> | null
  chartRates: Array<CryptoHistoryRate> | null
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const CryptoTable: React.FC<PropsTypes> = (props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Price $</TableCell>
            <TableCell align="right">7d Chart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.items && props.items.map((row: CryptoRate, i: number) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                {row.name}{arrow[row.diff]}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{ props.chartRates ? <CryptoTableChart rate={props.chartRates[i]}/> : null }</TableCell>
              </TableRow>
            ))}
        </TableBody>
        </Table> 
        
    </TableContainer>
  );
};

export { CryptoTable }