import React, { useEffect, useState } from "react";
import { getData } from "./ServerServices/ServerServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import moment from "moment/moment";

function Display() {
  const [data, setData] = useState([]);

  const getAllData = async () => {
    const data = await getData("user");
    if (data.status) {
      setData(data.data);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <div style={{ marginTop: "90px" }}>
        <TableContainer component={Paper}>
          <Table
            style={{ padding: 20 }}
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Firstname</StyledTableCell>
                <StyledTableCell align="center">Lastname</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Country</StyledTableCell>
                <StyledTableCell align="center">State</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">DOB</StyledTableCell>
                <StyledTableCell align="center">Age</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <StyledTableRow key={item.name}>
                  <StyledTableCell component="th" scope="row">
                    {item.firstname}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.lastname}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.country}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.state}</StyledTableCell>
                  <StyledTableCell align="center">{item.city}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.gender}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(item.dob).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.age}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Display;
