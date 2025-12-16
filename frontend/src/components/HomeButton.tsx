import React from "react";
import { useNavigate } from "react-router-dom";
import {Home} from "lucide-react";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <style>
        {`
          .home-button {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #686868ff;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          }
          .home-button:hover {
            background-color: #3b3b3bff;
          }
        `}
      </style>

      <button className="home-button" onClick={handleClick}>
        <Home className="h-6 w-6 text-primary" />
      </button>
    </>
  );
};

export default HomeButton;