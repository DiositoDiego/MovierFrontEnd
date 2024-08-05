import React from "react";
import { Button } from "react-bootstrap";

export default function ForbiddenPage() {
  return (
    <div className="error-container">
      <h1 className="code-error">403</h1>
      <p>No tienes acceso a esta página</p>
      <Button variant="contained" onClick={() => window.history.back()}>
        Atrás
      </Button>
    </div>
  );
}
