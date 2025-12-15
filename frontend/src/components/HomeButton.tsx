import React from "react";
import { useNavigate } from "react-router-dom";

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
            background-color: #4CAF50;
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
            background-color: #45a049;
          }
        `}
      </style>

      <button className="home-button" onClick={handleClick}>
        🏠
      </button>
    </>
  );
};

export default HomeButton;