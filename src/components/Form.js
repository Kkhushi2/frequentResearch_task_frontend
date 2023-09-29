import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { getData, postData } from "./ServerServices/ServerServices";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import dayjs from "dayjs";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundPosition: "center",
    width: "100vw",
    height: "80vh",
    marginTop: 50,
  },
  subdiv: {
    display: "flex",
    background: "#f5f6fa",
    padding: 30,
    width: 600,
    flexDirection: "column",
    alignItems: "center",
  },

  btn: {
    float: "right",
    backgroundColor: " #263a4a",
  },

  inputstyle: { display: "none" },
}));

export default function Form() {
  const classes = useStyles();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const date = new Date();
  date.setFullYear(date.getFullYear() - 14);
  const [dob, setDob] = useState(dayjs(date));
  const [age, setAge] = useState(14);
  const [message, setMessage] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const handleSubmit = async () => {
    const body = {
      firstname,
      lastname,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    };
    const result = await postData(`user`, body);
    if (result.status) {
      Swal.fire({
        text: "Submitted Successfully..",
        icon: "success",
      });
    } else {
      setMessage({
        [result.message[0].context.key]: result.message[0].message,
      });
    }
  };

  const handleDateChange = (date) => {
    setDob(date);
    var diff_ms = Date.now() - new Date(date).getTime();
    var age_dt = new Date(diff_ms);

    setAge(Math.abs(age_dt.getUTCFullYear() - 1970));
  };

  const fetchCountry = async () => {
    const result = await getData("");
    if (result.status) {
      setCountryList(result.data);
    }
  };

  const fetchState = async (id) => {
    const result = await getData("state/" + id);
    if (result.status) {
      setStateList(result.data);
    }
  };

  const fetchCity = async (id) => {
    const result = await getData("city/" + id);
    if (result.status) {
      setCityList(result.data);
    }
  };

  React.useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <div className={classes.root}>
      <div
        style={{ border: "1px solid darkgrey", borderRadius: 10 }}
        className={classes.subdiv}
      >
        <div className={classes.gap}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 25,
                  fontWeight: "bold",
                  letterSpacing: 1,
                  fontFamily: "crimsontext",
                }}
              >
                Add Details
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Firstname"
                fullWidth
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                error={message.firstname ? true : false}
                helperText={message.firstname}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Lastname"
                fullWidth
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                error={message.lastname ? true : false}
                helperText={message.lastname}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={message.email ? true : false}
                helperText={message.email}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={message.country ? true : false}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="country"
                  onChange={(event) => {
                    setCountry(event.target.value);
                    fetchState(event.target.value);
                  }}
                >
                  {countryList.map((item) => (
                    <MenuItem value={item._id}>{item.countryname}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{message.country}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth error={message.state ? true : false}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="State"
                  onChange={(event) => {
                    setState(event.target.value);
                    fetchCity(event.target.value);
                  }}
                >
                  {stateList.map((item) => (
                    <MenuItem value={item._id}>{item.statename}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{message.state}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={message.city ? true : false}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="City"
                  onChange={(event) => setCity(event.target.value)}
                >
                  {cityList.map((item) => (
                    <MenuItem value={item._id}>{item.cityname}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{message.city}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
                <FormHelperText style={{color:'red'}}>{message.gender}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  slotProps={{ textField: { fullWidth: true } }}
                  label="Dob"
                  value={dob}
                  onChange={handleDateChange}
                  maxDate={dayjs(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormHelperText>{message.dob}</FormHelperText>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={() => handleSubmit()}
                variant="contained"
                style={{ backgroundColor: "#000" }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
