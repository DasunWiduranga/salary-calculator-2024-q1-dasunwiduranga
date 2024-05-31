import React, { useContext, useState } from "react";
import { SalaryContext } from "../context/SalaryContext";
import { Grid, TextField, Typography, IconButton, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const SalaryForm = () => {
  const { state, dispatch } = useContext(SalaryContext);
  const [basicSalary, setBasicSalary] = useState(state.basicSalary);
  const [earnings, setEarnings] = useState([
    { name: "", amount: 0, epfEpfApplicable: false },
  ]);
  const [deductions, setDeductions] = useState([{ name: "", amount: 0 }]);

  const handleAddEarningField = () => {
    setEarnings([
      ...earnings,
      { name: "", amount: 0, epfEpfApplicable: false },
    ]);
  };

  const handleAddDeductionField = () => {
    setDeductions([...deductions, { name: "", amount: 0 }]);
  };

  const handleEarningChange = (index, field, value) => {
    const newEarnings = earnings.map((earning, i) =>
      i === index ? { ...earning, [field]: value } : earning
    );
    setEarnings(newEarnings);
  };

  const handleDeductionChange = (index, field, value) => {
    const newDeductions = deductions.map((deduction, i) =>
      i === index ? { ...deduction, [field]: value } : deduction
    );
    setDeductions(newDeductions);
  };

  const handleAddEarnings = () => {
    earnings.forEach((earning) => {
      dispatch({
        type: "ADD_EARNING",
        payload: { ...earning, id: Date.now() },
      });
    });
    setEarnings([{ name: "", amount: 0, epfEpfApplicable: false }]);
  };

  const handleAddDeductions = () => {
    deductions.forEach((deduction) => {
      dispatch({
        type: "ADD_DEDUCTION",
        payload: { ...deduction, id: Date.now() },
      });
    });
    setDeductions([{ name: "", amount: 0 }]);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {/* Basic Salary Section */}
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={2}
      >
        <Typography sx={{ fontWeight: "bold" }}>Basic Salary</Typography>
        <TextField
          size="small"
          type="number"
          value={basicSalary}
          onChange={(e) => {
            setBasicSalary(parseFloat(e.target.value));
            dispatch({ type: "SET_BASIC_SALARY", payload: e.target.value });
          }}
        />
      </Grid>

      {/* Earnings Section */}
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={2}
      >
        <Typography sx={{ fontWeight: "bold" }}>Earnings</Typography>
        <Typography sx={{ fontSize: 12 }}>
          Allowance, Fixed Allowance, Bonus and etc.
        </Typography>
        {earnings.map((earning, index) => (
          <Grid
            key={index}
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            mt={1}
            spacing={1}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                size="small"
                type="text"
                value={earning.name}
                onChange={(e) =>
                  handleEarningChange(index, "name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                size="small"
                type="number"
                value={earning.amount}
                onChange={(e) =>
                  handleEarningChange(
                    index,
                    "amount",
                    parseFloat(e.target.value)
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <label>
                <input
                  type="checkbox"
                  checked={earning.epfEpfApplicable}
                  onChange={(e) =>
                    handleEarningChange(
                      index,
                      "epfEpfApplicable",
                      e.target.checked
                    )
                  }
                />
                EPF/ETF Applicable
              </label>
            </Grid>
          </Grid>
        ))}
        <IconButton onClick={handleAddEarningField} sx={{ color: "blue" }}>
          <AddIcon />
        </IconButton>
        <Button onClick={handleAddEarnings} sx={{ color: "blue" }}>
          Add New Allowance
        </Button>
      </Grid>

      {/* Deductions Section */}
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={2}
      >
        <Typography sx={{ fontWeight: "bold" }}>Deductions</Typography>
        <Typography sx={{ fontSize: 12 }}>
          Salary Advance, Loan Deduction and all
        </Typography>
        {deductions.map((deduction, index) => (
          <Grid
            key={index}
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            mt={1}
            spacing={1}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                size="small"
                type="text"
                value={deduction.name}
                onChange={(e) =>
                  handleDeductionChange(index, "name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                size="small"
                type="number"
                value={deduction.amount}
                onChange={(e) =>
                  handleDeductionChange(
                    index,
                    "amount",
                    parseFloat(e.target.value)
                  )
                }
              />
            </Grid>
          </Grid>
        ))}
        <IconButton onClick={handleAddDeductionField} sx={{ color: "blue" }}>
        <AddIcon />
        </IconButton>
        <Button onClick={handleAddDeductions} sx={{ color: "blue" }}>
          Add New Deduction
        </Button>
      </Grid>

      {/* Reset Button */}
      <Grid item>
        <Button
          onClick={() => dispatch({ type: "RESET" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "blue",
          }}
        >
          
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

export default SalaryForm;
