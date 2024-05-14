
import Map from "./componentes/Map";
import { getRecursoList } from "./services/recursos";
export default async function Home() {
  const recursosData = await getRecursoList();
  const edificiosData = await getEdificiosList();
  // p-22 no deber ser, achica el main por asi decirlo
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">  
     <Map recursos={recursosData} edificios={edificiosData} ></Map>
    </main>
  );
}
