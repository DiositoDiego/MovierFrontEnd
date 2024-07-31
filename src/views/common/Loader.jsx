import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  const styles = {
    container: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
  };
  return (
    <div style={styles.container}>
      <Spinner size="md" />
      <h3>Cargando...</h3>
    </div>
  );
}
