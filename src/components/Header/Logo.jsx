import React from 'react'
import { useNavigate } from 'react-router-dom'


const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate("/")} className="hover:cursor-pointer">
      <h1 className="font-bold text-2xl text-violet-700">Evento</h1>
    </div>
  );
}

export default Logo
