'use client'
import React, {useState,useEffect} from "react";
import Map from "./componentes/Map";
import { getEdificioList } from "./services/edificios-menu";
import { getRecursoList } from "./services/recursos";
import { PartidaType } from "./models/partidas";
import { EdificioType } from "./models/edificios";
import BuildingGrid from "./componentes/building/BuildingGrid";


export default function Home() {
  const [recursosData, setRecursosData] = useState<PartidaType['recursos'] | null>(null);
  const [edificiosData, setEdificiosData] = useState<EdificioType[]>([]);
  //const [terrenoData , setTerrenoData] = useState<PartidaType['terreno'] | null> (null); 
  //const [terrenoBool, setTerrenoBool] = useState<Record<string, boolean>>({});

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await getRecursoList();
        setRecursosData(response);
        const fetchedEdificios = await getEdificioList();
        setEdificiosData(fetchedEdificios || []);
    
      }catch(error){
        console.error(error);
      }
    };
    fetchData();
    //const intervalId = setInterval(fetchData);
  }, []);
  //window.location.reload();
  const handleRecursosUpdate = (updateRecursos: PartidaType['recursos']) => {
    setRecursosData(updateRecursos);
  };

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between">  
     {recursosData && <Map recursos={recursosData} edificios={edificiosData} onRecursosUpdate={handleRecursosUpdate}></Map>}
    </main>
  );
}
