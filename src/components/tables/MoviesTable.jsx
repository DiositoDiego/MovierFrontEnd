import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../css/admin/MoviesTable.css";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import DoneIcon from "@mui/icons-material/Done";
const rows = [
  {
    key: "1",
    image:
      "https://cdn.apis.cineplanet.cl/CDN/media/entity/get/FilmPosterGraphic/HO00001232?referenceScheme=HeadOffice&allowPlaceHolder=true",
    title: "Bad Boys",
    genre: "Acción",
    description: "Dos hombres en acción",
    status: 1,
  },
  {
    key: "2",
    image: "https://lumiere-a.akamaihd.net/v1/images/image_26964b90.jpeg",
    title: "Intensa Mente",
    genre: "Drama",
    description: "Niña con emociones fuertes",
    status: 0,
  },
];

const columns = [
  {
    key: "image",
    label: "Portada",
  },
  {
    key: "title",
    label: "Título",
  },
  {
    key: "genre",
    label: "Género",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "status",
    label: "Estado",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export const MoviesTable = () => {
  const navigate = useNavigate();
  const onAddMovie = () => {
    navigate("/create-movie");
  };

  const onEditMovie = () => {
    navigate("/edit-movie");
  };

  const onDeleteMovie = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "vas a desactivar la película",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#72557C",
      cancelButtonColor: "#3A2A42",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "La película ha sido desactivada", "success");
      }
    });
  };

  const onActivateMovie = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "vas a activar la película",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#72557C",
      cancelButtonColor: "#3A2A42",
      confirmButtonText: "Sí, activar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Activada", "La película ha sido activada", "success");
      }
    });
  };

  const getKeyValue = (item, key) => {
    if (key === "image") {
      return <img src={item[key]} alt={item.title} width="50" height="75" />;
    }
    if (key === "status") {
      return (
        <Chip variant="flat" color={item[key] === 1 ? "success" : "danger"}>
          {item[key] === 1 ? "Activa" : "Inactiva"}
        </Chip>
      );
    }
    if (key === "actions") {
      return (
        <>
          <IconButton aria-label="edit" onClick={onEditMovie}>
            <EditIcon className="edit-icon" />
          </IconButton>

          {item.status === 1 ? (
            <IconButton aria-label="delete" onClick={onDeleteMovie}>
              <DeleteIcon className="delete-icon" color="error" />
            </IconButton>
          ) : (
            <IconButton aria-label="activate" onClick={onActivateMovie}>
              <DoneIcon className="add-icon" />
            </IconButton>
          )}
        </>
      );
    }
    if (key === "title") {
      return <p className="title-movie">{item[key]}</p>;
    }

    return item[key];
  };

  return (
    <>
      <h1 className="title">Lista de películas</h1>
      <div className="header">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddMovie}
        >
          Agregar película
        </Button>
      </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
