import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectEvent } from "../../redux/slices/SeminarSlice";

const SnackbarNotifier: React.FC = () => {

  const {validationErrors, openModal} = useSelector(selectEvent);

  
  const { enqueueSnackbar } = useSnackbar();
  const showError = () => {
    validationErrors?.forEach((v:string) =>{
      enqueueSnackbar(v, { variant: "error" })
    })
  
  };

  useEffect(()=>{
    validationErrors && showError();
  }, [validationErrors, openModal, enqueueSnackbar])
  return (
    <> </>
  );
};

export default function SnackbarWrapper() {
  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      <SnackbarNotifier />
    </SnackbarProvider>
  );
}
