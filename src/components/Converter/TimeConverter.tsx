import React, { useState, ChangeEvent } from "react";

const TimeConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [inverted, setInverted] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 빈 문자열은 허용 (입력 중일 수 있음)
    if (value === "") {
      setAmount(0);
      return;
    }
    const numberValue = Number(event.target.value);
    // 숫자가 아니거나 음수일 경우 무시
    if (isNaN(numberValue) || numberValue < 0) return;
    setAmount(numberValue);
  };
  const resetHandler = () => setAmount(0);

  const invertHandler = () => {
    resetHandler();
    setInverted((current) => !current);
  };
  const convertedValue = Number((amount / 60).toFixed(2));

  return (
    <div>
      <h3>Minutes ↔ Hours</h3>
      <h4>
        {inverted
          ? `Convert ${amount} hours to ${amount * 60} minutes`
          : `Convert ${amount} minutes to ${convertedValue} hours`}
      </h4>
      <div>
        <label htmlFor="minutes">Minutes: </label>
        <input
          value={inverted ? amount * 60 : amount}
          id="minutes"
          placeholder="Minutes"
          type="number"
          min="0"
          step="any"
          onChange={onChange}
          disabled={inverted}
        />
      </div>
      <div>
        <label htmlFor="hours">Hours: </label>
        <input
          value={inverted ? amount : convertedValue} //소수점 2자리까지 '문자열'로 표시. 따라서 number로 변환.
          id="hours"
          placeholder="Hours"
          type="number"
          min="0"
          step="any"
          disabled={!inverted}
          onChange={onChange}
        />
      </div>
      <button onClick={resetHandler}>Reset</button>
      <button onClick={invertHandler}>
        {inverted ? "Turn back" : "Invert"}
      </button>
    </div>
  );
};

export default TimeConverter;
