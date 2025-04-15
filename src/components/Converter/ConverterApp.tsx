// 단위 변환기 (상태 전환용)
import React, { useState, ChangeEvent } from "react";
import TimeConverter from "./TimeConverter";
import DistanceConverter from "./DistanceConverter";

const ConverterApp: React.FC = () => {
  const [index, setIndex] = useState<number>(0); //number type

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setIndex(Number(event.target.value));
  };

  return (
    <div>
      <h1>Super Converter</h1>
      <select value={index} onChange={onSelect}>
        <option value="0">Select your units</option>
        <option value="1">Minutes ↔ Hours</option>
        <option value="2">Kilometers ↔ Miles</option>
      </select>
      <hr />
      {index === 0 ? "Please select your units." : null}
      {index === 1 ? <TimeConverter /> : null}
      {index === 2 ? <DistanceConverter /> : null}
    </div>
  );
};

export default ConverterApp;
