import React, { useState, ChangeEvent } from "react";

const DistanceConverter: React.FC = () => {
  const [distance, setDistance] = useState<number>(0);
  const [inverted, setInverted] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") return setDistance(0);
    const numberValue = Number(value);
    if (isNaN(numberValue) || numberValue < 0) return;
    setDistance(numberValue);
  };

  const resetHandler = () => setDistance(0);

  const invertHandler = () => {
    resetHandler();
    setInverted((current) => !current);
  };

  return (
    <div>
      <h3>Kilometers ↔ Miles</h3>
      <h4>
        {inverted
          ? `Convert ${distance} miles to ${Number(
              (distance * 1.60934).toFixed(2)
            )} km.`
          : `Convert ${distance} km to ${Number(
              (distance / 1.60934).toFixed(2)
            )} miles.`}
      </h4>
      <div>
        <label htmlFor="kilometers">Kilometers: </label>
        <input
          value={inverted ? distance * 1.60934 : distance}
          onChange={onChange}
          id="kilometers"
          placeholder="Kilometers"
          type="number"
          min="0"
          step="any"
          disabled={inverted}
        />
      </div>
      <div>
        <label htmlFor="miles">Miles: </label>
        <input
          value={inverted ? distance : Number((distance / 1.60934).toFixed(2))}
          onChange={onChange}
          id="miles"
          placeholder="Miles"
          type="number"
          min="0"
          step="any"
          disabled={!inverted}
        />
      </div>
      <button onClick={resetHandler}>Reset</button>
      <button onClick={invertHandler}>
        {inverted ? "Turn back" : "invert"}
      </button>
    </div>
  );
};

export default DistanceConverter;
