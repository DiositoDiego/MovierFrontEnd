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
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../css/admin/MoviesTable.css";
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

function getKeyValue(item, key) {
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
        <IconButton aria-label="edit">
          <EditIcon className="edit-icon" />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon className="delete-icon" color="error" />
        </IconButton>
      </>
    );
  }
  if (key === "title") {
    return <p className="title-movie">{item[key]}</p>;
  }

  return item[key];
}

export const MoviesTable = () => {
  return (
    <>
      <h1 className="title">Lista de películas</h1>
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
