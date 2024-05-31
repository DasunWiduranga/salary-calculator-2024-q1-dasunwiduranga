import React from "react";
import { SalaryProvider } from "./context/SalaryContext";
import SalaryForm from "./components/SalaryForm";
import SalarySummary from "./components/SalarySummary";
import "./styles/App.css";
import { Typography, Grid } from "@mui/material";

function App() {

  return (
    <SalaryProvider>
    <Grid
      container
      direction={{ xs: "column", md: "row" }} // Stack vertically on small screens, horizontally on medium and up
      justifyContent="center"
      alignItems="stretch"
      columnGap={{ xs: 6, md: 4 }} // No gap on small screens, gap of 1 on medium and up
      rowGap={{ xs: 2, md: 1 }} // Add row gap on small screens for vertical stacking
      sx={{ padding: 3 }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{ backgroundColor: "#FAFAFA", padding: 2, borderRadius: 3 }}
      >
        <Typography sx={{ fontWeight: "700", fontFamily: "inter", fontSize: "20px" }}>
          Calculate Your Salary
        </Typography>
        <SalaryForm />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{ backgroundColor: "#FAFAFA", padding: 2, borderRadius: 3 }}
      >
        <SalarySummary />
      </Grid>
    </Grid>
  </SalaryProvider>
  
  );
}

export default App;
