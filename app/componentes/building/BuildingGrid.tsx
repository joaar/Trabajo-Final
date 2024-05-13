// BuildingGrid.tsx
import React, { useState } from "react";
import { Edificios } from "../../services/edificios-menu";
import baseimage from '../../public/placeholders/base_ph.png'
//import vacioimage from '../../public/placeholders/empty_ground_ph.png'
import { StaticImageData } from "next/image";

interface Props {
  buildingImages: (StaticImageData | null) [];
  onEmptyGroundClick: (index: number) => void;
}

const BuildingGrid: React.FC<Props> = ({buildingImages = [], onEmptyGroundClick }) => {
  if (buildingImages.length == 0){
    buildingImages = [null,baseimage,null];
  }
  // }else{
  //   buildingImages[buildingImages.length/2] = baseimage;
  // }
  
  const baseBuildingStyle = {
    backgroundImage: `url(${buildingImages[1]?.src})`,
  };

  // console.log(buildingImages)
  const emptyGroundStyle = (index: number) => {
    const imageUrl = buildingImages[index];
    return {
      backgroundImage: `url(${imageUrl?.src})`,
    };
  };

  return (
    <div className="flex flex-row">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          style={index === 1 ? baseBuildingStyle : emptyGroundStyle(index)}
          className="h-48 w-48 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-5"
          onClick={() => onEmptyGroundClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default BuildingGrid;
