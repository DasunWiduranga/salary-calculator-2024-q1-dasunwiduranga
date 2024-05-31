import React, { useContext } from "react";
import { SalaryContext } from "../context/SalaryContext";
import { Card, Grid, Typography} from "@mui/material";

const SalarySummary = () => {
  const { state, dispatch } = useContext(SalaryContext);

  const calculateTotalEarnings = () => {
    return (
      state.basicSalary +
      state.earnings.reduce((total, earning) => total + earning.amount, 0)
    );
  };

  const calculateTotalEarningsForEPF = () => {
    return (
      state.basicSalary +
      state.earnings
        .filter((earning) => earning.epfEpfApplicable)
        .reduce((total, earning) => total + earning.amount, 0)
    );
  };

  const calculateTotalDeductions = () => {
    return state.deductions.reduce(
      (total, deduction) => total + deduction.amount,
      0
    );
  };

  const totalEarnings = calculateTotalEarnings();
  const totalEarningsForEPF = calculateTotalEarningsForEPF();
  const grossDeductions = calculateTotalDeductions();
  const grossEarnings = totalEarnings - grossDeductions;
  const grossSalaryForEPF = totalEarningsForEPF - grossDeductions;
  const employeeEPF = grossSalaryForEPF * 0.08;
  const employerEPF = grossSalaryForEPF * 0.12;
  const employerETF = grossSalaryForEPF * 0.03;
  const APIT = grossEarnings * 0.18 - 25500;
  const netSalary = grossEarnings - employeeEPF - APIT;
  const costToCompany = grossEarnings + employerEPF + employerETF;

  return (
    <div>
    <Typography
      sx={{
        fontWeight: "700",
        fontFamily: "inter",
        fontSize: "20px",
      }}
    >
      Your Salary
    </Typography>
  
    <div>
      <Grid container spacing={0.1}> {/* Reduced the spacing here */}
        <Grid item xs={8}>
          <h3>Items</h3>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          <h3>Amount</h3>
        </Grid>
  
        <Grid item xs={8} style={{ marginBottom: 0 }}>
          <p>Basic Salary:</p>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right", marginBottom: 0 }}>
          <p>${state.basicSalary.toFixed(2)}</p>
        </Grid>
  
        <Grid item xs={8} style={{ marginBottom: 0 }}>
          <p>Gross Earnings:</p>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right", marginBottom: 0 }}>
          <p>{grossEarnings.toFixed(2)}</p>
        </Grid>
  
        <Grid item xs={8} style={{ marginBottom: 0 }}>
          <p>Gross Deductions:</p>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right", marginBottom: 0 }}>
          <p>{grossDeductions.toFixed(2)}</p>
        </Grid>
  
        <Grid item xs={8} style={{ marginBottom: 0 }}>
          <p>Employee EPF (8%):</p>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right", marginBottom: 0 }}>
          <p>{employeeEPF.toFixed(2)}</p>
        </Grid>
  
        <Grid item xs={8} style={{ marginBottom: 0 }}>
          <p>APIT:</p>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right", marginBottom: 0 }}>
          <p>{APIT.toFixed(2)}</p>
        </Grid>
  
        {/* Net Salary */}
        <Grid item xs={12}>
          <Card>
            <Grid container>
              <Grid item xs={8}>
                <h3 style={{ marginLeft: "4px" }}>Net Salary (Take Home)</h3>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <h3 style={{ marginRight: "8px" }}>${netSalary.toFixed(2)}</h3>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        
        <Grid item xs={8}>
          <Typography sx={{ color: "#757575", fontFamily: "inter", fontSize: "14px" }}>
            Contribution from the Employer
          </Typography>
        </Grid>
        
        <Grid item xs={8}>
          <p>Employer EPF (12%):</p>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          <p>{employerEPF.toFixed(2)}</p>
        </Grid>
  
        <Grid item xs={8}>
          <p>Employer ETF (3%):</p>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          <p>{employerETF.toFixed(2)}</p>
        </Grid>
  
        {/* Cost to Company */}
        <Grid item xs={8}>
          <h3>Cost To Company:</h3>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          <h3>{costToCompany.toFixed(2)}</h3>
        </Grid>
      </Grid>
    </div>
  </div>
  
  );
};

export default SalarySummary;
