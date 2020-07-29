import 'date-fns';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { AppContext } from '../../context';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const FlightTicketsContainer = () => {

  const { state: { originAutcomplete, destinationAutocomplete }, getUserInfo } = React.useContext(AppContext);

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [checked, setChecked ] = React.useState(false)

  const [open, setOpen] = React.useState(false);

  const [options, setOptions] = React.useState([{name: 'Yo'}]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleCheckboxChange = (event: any) => {
    setChecked(!checked);
  };

  React.useEffect(() => {
    getUserInfo()
  }, [])
  
  return (
    <Paper>
      <Typography variant="h6" component="h6">
        Flight Tickets
      </Typography>
      <TextField id="outlined-basic" label="Origin" variant="outlined" />
      <TextField id="outlined-basic" label="Destination" variant="outlined" />
      {/*<Autocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        renderInput={(params: any) => (
          <TextField id="outlined-basic" label="Origin" variant="outlined" />
        )}
      />
      <Autocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        renderInput={(params: any) => (
          <TextField id="outlined-basic" label="Destination" variant="outlined" />
        )}
        />*/}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckboxChange} name="checked"  color="primary"/>}
          label="One-way trip"
        />
      </FormGroup>
    </Paper>
  );
};

export { FlightTicketsContainer };