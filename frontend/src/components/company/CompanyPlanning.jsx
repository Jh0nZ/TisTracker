import React, { useEffect, useState } from "react";
import { Box, Typography, List, Button } from "@mui/material";
import Milestone from "./Milestone";
import { useUpdateCompanyPlanningByIdMutation } from "../../api/companyApi";
import DialogMod from "../DialogMod";
import { CiCirclePlus } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useRegisterPlanningMutation } from "../../api/planningApi";

const CompanyPlanning = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [milestones, setMilestones] = useState([]);

  const [registerPlanning, { data, isSuccess, error, isError, isLoading }] =
    useRegisterPlanningMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isSuccess, error, isError]);

  const handleConfirm = () => {
    const form = { name: "planning", company_id: id, milestones: milestones };
    console.log(form);
    registerPlanning(form);
    setOpen(false);
  };

  const handleMilestoneChange = (updatedMilestone, milestone_id) => {
    const updatedMilestones = milestones.map((milestone, index) => {
      console.log(milestone_id, index);
      return milestone_id === index ? updatedMilestone : milestone;
    });

    setMilestones(updatedMilestones);
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      name: "Nuevo Hito",
      start_date: new Date(),
      end_date: new Date(),
      deliverables: [],
    };

    setMilestones((prev) => [...prev, newMilestone]); // Agrega el nuevo hito a la lista temporal
  };

  const handleDeleteMilestone = (id) => {
    const updatedMilestones = milestones.filter((e) => e.id !== id);
    setMilestones(updatedMilestones);
  };

  return (
    <div className="container">
      <Typography
        component="h1"
        sx={{ color: "black", fontSize: "40px", lineHeight: "1" }}
      >
        Planificación de equipo
      </Typography>
      <List>
        {milestones.length > 0 ? (
          milestones.map((milestone, index) => (
            <Milestone
              key={index}
              milestone_id={index}
              milestone={milestone}
              onChange={handleMilestoneChange}
              onDelete={handleDeleteMilestone}
            />
          ))
        ) : (
          <p>No hay hitos asignados</p>
        )}
      </List>

      <Button
        color="primary"
        onClick={handleAddMilestone}
        sx={{
          backgroundColor: "transparent",
          "&:hover": {
            color: "white",
            backgroundColor: "primary.dark",
          },
          mr: 2,
          mb: 2,
        }}
      >
        <i>
          <CiCirclePlus />
        </i>{" "}
        Agregar Hito
      </Button>

      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "transparent",
          border: "1px solid black",
          "&:hover": {
            color: "white",
            backgroundColor: "primary.dark",
          },
          mb: 2,
          mr: 2,
        }}
      >
        Confirmar
      </Button>

      <DialogMod
        open={open}
        setOpen={setOpen}
        title={"Confirmar"}
        content={"¿Está seguro de realizar esta acción?"}
        onAccept={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
};

export default CompanyPlanning;
