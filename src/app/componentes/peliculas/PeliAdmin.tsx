import { useState } from "react";
import { Pelicula } from "../../modelos/Pelicula";
import { ARREGLO_PELICULAS } from "../../mocks/Pelicula-mocks";
import { ARREGLO_PELICULA_GENERO } from "../../utilidades/dominios/DomGenero";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export const PeliAdmin = () => {
  const [arrPeliculas] = useState<Pelicula[]>(ARREGLO_PELICULAS);
  const [objPeli, setObjPeli] = useState<Pelicula>(
    new Pelicula(0, "", "", "", "", "")
  );

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };

  const getNombreGenero = (valor: string) => {
    for (const objGen of ARREGLO_PELICULA_GENERO) {
      if (objGen.codGenero == valor) {
        return objGen.nombreGenero;
      }
    }
  };
  const eliminarPelicula = (codigo: number) => {
    const cantidad = arrPeliculas.length;

    for (let i = 0; i < cantidad; i++) {
      if (arrPeliculas[i] != undefined) {
        const comparar = arrPeliculas[i].codPelicula;

        if (comparar == codigo) {
          arrPeliculas.splice(i, 1);
        }
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-danger">
                <th style={{ width: "10%" }}>Código</th>
                <th style={{ width: "25%" }}>Nombre</th>
                <th style={{ width: "15%" }}>Género</th>
                <th style={{ width: "20%" }}>Protagonista</th>
                <th style={{ width: "20%" }}>Imagen</th>
                <th style={{ width: "10%" }}> </th>
              </tr>
            </thead>
            <tbody>
              {arrPeliculas.map((miPeli: Pelicula) => (
                <tr className="align-middle" key={miPeli.codPelicula}>
                  <td>{miPeli.codPelicula}</td>
                  <td>{miPeli.nombrePelicula}</td>
                  <td>{getNombreGenero(miPeli.codGeneroPelicula)}</td>
                  <td>{miPeli.protagonistaPelicula}</td>
                  <td>
                    <img
                      src={miPeli.imagenPeliculaBase64}
                      alt="LogoPelicula"
                      className="imagenListado"
                    />
                    <div className="text-info">{miPeli.imagenPelicula}</div>
                  </td>
                  <td className="text-center">
                    <a 
                    href="/#"
                    onClick={(e)=>{
                      e.preventDefault();
                      setShow(true);
                      setObjPeli(miPeli);
                    }}>
                      <i className="fa-solid fa-trash-can rojito"></i>
                    </a>{" "}
                    <NavLink to={"/pactual/:codigo"+miPeli.codPelicula}>
                      <i className="fa-regular fa-pen-to-square verde"></i>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Eliminar Películas</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              ¿Está seguro de eliminar la película {objPeli.nombrePelicula}?
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={(e) => {
                  setShow(false);
                }}
              >
                Cancelar
              </Button>

              <Button
                variant="danger"
                onClick={(e) => {
                  eliminarPelicula(objPeli.codPelicula);
                  setShow(false);
                }}
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
