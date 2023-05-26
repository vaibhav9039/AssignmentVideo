import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [bool, setBool] = useState(false);
  const [inputValues, setInputValues] = useState([
    { value: "My Arg", bool: false }
  ]);
  const [result, setResult] = useState(undefined);
  const [constantValue, setConstantValue] = useState("");
  const [argumentsList, setArgumentsList] = useState([]);
  const [selectedArgument, setSelectedArgument] = useState("");
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [additionalOps, setAdditionalOps] = useState([]); // New state for additional operations

  const handleDropdownChange = (event, index) => {
    const selectedValue = event.target.value;
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index].bool = selectedValue === "true";
      return updatedValues;
    });
  };

  const handleInputChange = (event, index) => {
    const newValue = event.target.value;
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index].value = newValue;
      return updatedValues;
    });
  };

  const handleAddArg = () => {
    const newArg = { value: "newarg", bool: false };
    setInputValues((prevValues) => [...prevValues, newArg]);
    setArgumentsList((prevArgs) => [...prevArgs, newArg.value]);
    setSelectedArgument(newArg.value);
  };

  const handleConstantSelect = (event) => {
    const selectedValue = event.target.value;
    setConstantValue(selectedValue);
    setResult(selectedValue === "option1" ? bool.toString() : undefined);

    if (selectedValue === "option3") {
      setShowDropdowns(true);
    } else {
      setShowDropdowns(false);
    }

    if (selectedValue === "option2") {
      const args = inputValues.map((item) => item.value);
      setArgumentsList(args);
      setSelectedArgument(args[0]);
    } else {
      setArgumentsList([]);
      setSelectedArgument("");
    }
  };

  const handleResetConstant = () => {
    setConstantValue("");
    setResult(undefined);
    setArgumentsList([]);
    setSelectedArgument("");
    setShowDropdowns(false);
  };

  const handleArgumentSelect = (event) => {
    const selectedArgument = event.target.value;
    setSelectedArgument(selectedArgument);
    const argumentValue = inputValues.find(
      (item) => item.value === selectedArgument
    );
    setResult(argumentValue.bool.toString());
  };

  const handleAddOp = () => {
    setAdditionalOps((prevOps) => [...prevOps, "option1"]);
  };

  useEffect(() => {
    if (constantValue === "option1") {
      setResult(bool.toString());
    } else if (constantValue === "option2") {
      const argumentValue = inputValues.find(
        (item) => item.value === selectedArgument
      );
      if (argumentValue) {
        setResult(argumentValue.bool.toString());
      }
    }
  }, [bool, constantValue, inputValues, selectedArgument]);

  return (
    <div className="App">
      {inputValues.map((item, index) => (
        <div key={index}>
          <input
            value={item.value}
            onChange={(e) => handleInputChange(e, index)}
          />
          <select
            value={item.bool.toString()}
            onChange={(e) => handleDropdownChange(e, index)}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>
      ))}
      <button style={{ marginRight: "153px" }} onClick={handleAddArg}>
        + add arg
      </button>
      {constantValue === "option1" ? (
        <div style={{ marginRight: "145px", marginTop: "20px" }}>
          <select
            value={bool.toString()}
            onChange={(e) => setBool(e.target.value === "true")}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
          <button onClick={handleResetConstant} disabled={constantValue === ""}>
            X
          </button>
        </div>
      ) : constantValue === "option2" ? (
        <div style={{ marginRight: "120px", marginTop: "20px" }}>
          <select value={selectedArgument} onChange={handleArgumentSelect}>
            {argumentsList.map((arg, index) => (
              <option key={index} value={arg}>
                {arg}
              </option>
            ))}
          </select>
          <button onClick={handleResetConstant} disabled={constantValue === ""}>
            X
          </button>
        </div>
      ) : constantValue === "option3" ? (
        <>
          <div style={{ marginRight: "120px", marginTop: "20px" }}>
            <select
              value={constantValue}
              onChange={handleConstantSelect}
              disabled={constantValue !== ""}
            >
              <option value="" style={{ color: "#999999" }}>
                select...
              </option>
              <option value="option1">constant</option>
              <option value="option2">argument</option>
              <option value="option3">and</option>
              <option value="option4">or</option>
            </select>
            <button
              onClick={handleResetConstant}
              disabled={constantValue === ""}
            >
              X
            </button>
          </div>
          <div style={{ marginRight: "90px" }}>
            <select>
              <option value="" style={{ color: "#999999" }}>
                select...
              </option>
              <option value="option1">constant</option>
              <option value="option2">argument</option>
              <option value="option3">and</option>
              <option value="option4">or</option>
            </select>
            <button
              onClick={handleResetConstant}
              disabled={constantValue === ""}
            >
              X
            </button>
            <select>
              <option value="" style={{ color: "#999999" }}>
                select...
              </option>
              <option value="option1">constant</option>
              <option value="option2">argument</option>
              <option value="option3">and</option>
              <option value="option4">or</option>
            </select>
            <button
              onClick={handleResetConstant}
              disabled={constantValue === ""}
            >
              X
            </button>
          </div>
          <div style={{ marginRight: "90px" }}>
            {additionalOps.map((op, index) => (
              <React.Fragment key={index}>
                <select>
                  <option value="" style={{ color: "#999999" }}>
                    select...
                  </option>
                  <option value="option1">constant</option>
                  <option value="option2">argument</option>
                  <option value="option3">and</option>
                  <option value="option4">or</option>
                </select>
                <button
                  onClick={handleResetConstant}
                  disabled={constantValue === ""}
                >
                  X
                </button>
              </React.Fragment>
            ))}
            <button style={{ marginRight: "40px" }} onClick={handleAddOp}>
              + add op
            </button>
          </div>
        </>
      ) : (
        <div style={{ marginRight: "120px", marginTop: "20px" }}>
          <select
            value={constantValue}
            onChange={handleConstantSelect}
            disabled={constantValue !== ""}
          >
            <option value="" style={{ color: "#999999" }}>
              select...
            </option>
            <option value="option1">constant</option>
            <option value="option2">argument</option>
            <option value="option3">and</option>
            <option value="option4">or</option>
          </select>
          <button onClick={handleResetConstant} disabled={constantValue === ""}>
            X
          </button>
        </div>
      )}
      <div style={{ marginRight: "106px", marginTop: "20px" }}>
        <span>result: {result !== undefined ? result : "undefined"}</span>
      </div>
    </div>
  );
}
