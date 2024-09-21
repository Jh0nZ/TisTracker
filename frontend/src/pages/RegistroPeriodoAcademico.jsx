import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCreateAcademicPeriodMutation } from "../api/academicPeriodApi";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";

const RegistroPeriodoAcademico = () => {
  const MAX_DESCRIPTION_LENGTH = 255;
  const MIN_DAYS_DIFFERENCE = 3;
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [nameError, setNameError] = useState(false);

  const [createAcademicPeriod, { data, error, isLoading, isError, isSuccess }] =
    useCreateAcademicPeriodMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      navigate("/academic-periods")
    }
    if (isError) {
      if (error.data?.errors?.name) {
        //setErrors(error.data.errors || {});
        setNameError(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "El nombre ya esta en uso",
        }));
      }
      console.log(error);
    }
  }, [isSuccess, isError, error, data]);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: undefined,
      }));
    }
  };

  const handleNameChange = (e) => {
    setNameError(false);
    setName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: undefined,
    }));
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      startDate: undefined,
    }));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      endDate: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!name) newErrors.name = "Este campo es obligatorio.";
    if (!startDate) newErrors.startDate = "Este campo es obligatorio.";
    if (!endDate) newErrors.endDate = "Este campo es obligatorio.";
    if (description.length > MAX_DESCRIPTION_LENGTH)
      newErrors.description = `La descripción no puede exceder ${MAX_DESCRIPTION_LENGTH} caracteres.`;

    // Validación de fechas
    if (startDate && endDate) {
      if (startDate > endDate) {
        newErrors.startDate =
          "La fecha de inicio no puede ser mayor que la fecha de fin.";
      } else if (differenceInDays(endDate, startDate) < MIN_DAYS_DIFFERENCE) {
        newErrors.endDate = `La diferencia mínima debe ser de ${MIN_DAYS_DIFFERENCE} días.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createAcademicPeriod({
      name,
      start_date: startDate,
      end_date: endDate,
      description,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Registro de Período Académico
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name || "* Obligatorio"}
              value={name}
              onChange={handleNameChange}
              disabled={isLoading}
            />
          </FormControl>

          {/* Descripción */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              error={!!errors.description}
              helperText={
                errors.description ||
                `Máximo ${MAX_DESCRIPTION_LENGTH} caracteres.`
              }
              value={description}
              onChange={handleDescriptionChange}
              disabled={isLoading}
            />
          </FormControl>

          {/* Fecha de Inicio y Fecha Fin */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <DatePicker
                  label="Fecha Inicio"
                  value={startDate}
                  onChange={handleStartDateChange}
                  slotProps={{
                    textField: {
                      error: !!errors.startDate,
                      helperText: errors.startDate || "DD/MM/AAAA",
                    },
                  }}
                  format="dd/MM/yyyy"
                  disabled={isLoading}
                />
                <DatePicker
                  label="Fecha Fin"
                  value={endDate}
                  onChange={handleEndDateChange}
                  slotProps={{
                    textField: {
                      error: !!errors.endDate,
                      helperText: errors.endDate || "DD/MM/AAAA",
                    },
                  }}
                  format="dd/MM/yyyy"
                  disabled={isLoading}
                />
              </Box>
            </LocalizationProvider>
          </FormControl>

          {/* Botón de Registro */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading || nameError}
          >
            {isLoading ? <CircularProgress size={24} /> : "Registrar Período"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegistroPeriodoAcademico;
