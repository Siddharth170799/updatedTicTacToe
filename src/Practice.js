import React, { useCallback, useEffect, useState } from "react";
import data from "./Data";

const Practice = () => {
  const [array, setArray] = useState([]);
  const [displayOption, setDisplayOption] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index1, item3) => {
    const newArray = new Array(9).fill(null);
    setArray(newArray);
    setSelectedItem(item3);

    const data2 = array.length > 0 ? array : newArray;
    const data1 = data2.map((item, index3) => {
      return index3 == index1 ? item3 : item;
    });
    setArray(data1);

    if (item3 == "X") {
      setDisplayOption("O");
    } else {
      setDisplayOption("X");
    }
  };

  const handleGameSuccess = () => {
    const result = positions.some((item) =>
      item.every((item1) => array[item1] == selectedItem)
    );
 
    if (result) {
      setSuccessMessage("You Won The Game");
      return;
    }
    if (array.length > 0) {
      const details = array?.every((item) => item);

      if (details) {
        setSuccessMessage("Game Ended In a Draw");
      }
    }
  };

  useEffect(() => {
    handleGameSuccess();
  }, [array]);

  const startOver1 = useCallback(() => {
    setSuccessMessage("");
    setArray([]);
  }, []);

  return (
    <div className="game-container">
      <h1 className="game-title">Welcome To The World of Tic Tac Toe</h1>
      <div
        className={`success-message ${successMessage ? "visible" : "hidden"}`}
      >
        {successMessage}
      </div>
      <div className="grid-container">
        {array.length > 0
          ? array.map((item, index) => {
              if (item != null) {
                return (
                  <div
                    key={index}
                    className={`grid-item ${
                      item === "X" ? "x-item" : "o-item"
                    }`}
                  >
                    <div onClick={() => handleClick(index, item)}>{item}</div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="grid-item">
                    <button
                      disabled={successMessage}
                      className="option-btn"
                      onClick={() => handleClick(index, displayOption)}
                    >
                      {displayOption}
                    </button>
                  </div>
                );
              }
            })
          : data.map((item, index) => {
              return (
                <div key={index} className="grid-item">
                  <button
                    className="option-btn"
                    onClick={() => handleClick(index, item.option1)}
                  >
                    {item?.option1}
                  </button>
                  <button
                    className="option-btn"
                    onClick={() => handleClick(index, item.option2)}
                  >
                    {item?.option2}
                  </button>
                </div>
              );
            })}
      </div>
      {successMessage ? (
        <button className="start-over-btn" onClick={startOver1}>
          Start Over
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Practice;
