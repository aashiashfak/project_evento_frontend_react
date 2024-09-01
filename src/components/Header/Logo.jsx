import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoImg from "../../assets/StaticImages/Logo.png"


const Logo = () => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate("/")}
      className="hover:cursor-pointer flex gap-1"
    >
      <h1
        className="font-bold text-2xl"
        style={{color: "#4900be"}}
      >
        Evento
      </h1>
      <img src={LogoImg} alt="" className=" w-6 h-6 mt-[2px] " />
    </div>
  );
}

export default Logo
