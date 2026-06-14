import React from "react";
import { NavBar } from "../../NavBar";
import avt from "../../../../public/d09df851e636fc7377e7a5fb048706c0.jpg";

export const RoadmapHeader: React.FC = () => {
  return (
    <NavBar
      isLoggedIn={true}
      userAvatar={avt}
      userName="anh Huy"
    />
  );
};
