import { useEffect, useState } from "react";
import { db } from "./data/db"
import "./App.css";
import Header from "./components/Header";
import Guitar from "./components/Guitar";

function App() {
  // Iniciamos la variable data con un array vacio
  const [data, setData] = useState([])

  // cuando se monta el componente actualizamoss data con el contenido de db/ recomendado para APIs
  useEffect(() => {
    setData(db)
  }, [])


  return (
    <>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              name={guitar.name}
              description={guitar.description}
              price={guitar.price}
              image={guitar.image}

            />
          ))}

        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
