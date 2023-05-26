import React, { useState } from 'react'

function Main() {

  //States
  const [resultArg, setResultArg] = useState("undefined");
  const [arg, setArg] = useState({ "MyArg": false });
  const [mode, setMode] = useState("start");
  const [selectedArg, setSelectedArg] = useState("MyArg");
  const [selectedConstant, setSelectedConstant] = useState("false");


  //Methods
  function addArgument() {
    let key = "newarg" + Math.floor(Math.random() * 1000);
    setArg(current => ({ ...current, [key]: false }));
  }

  function editArgument(item, option) {
    let value = false;
    if (option == "true") value = true;

    setArg(current => ({ ...current, [item]: value }));
  }

  function editConstant(item) {
    if (item === "true") setSelectedConstant("true");
    else setSelectedConstant("false");
  }

  function editKey(key, newKey) {
    arg[newKey] = arg[key];
    delete arg[key];
    setArg({ ...arg });
  }

  function editMode(mode) {
    setMode(mode);
    if (mode === 'and' || mode === 'or') extraFunc();
    else document.getElementsByClassName('start')[0].selectedIndex = 0;
  }

  function editSelectedArg(item) {
    setSelectedArg(item);
  }

  function extraFunc() {
    let toBeAdded = `<select className="start" style={mode==="start"||mode==="and"||mode==="or" ? {} : { display: 'none' }}
    onChange={(e) => editMode(e.target.value)}>
    <option value="select" selected disabled>select...</option>
    <option value="constant">constant</option>
    <option value="argument">argument</option>
    <option value="and">and</option>
    <option value="or">or</option>
  </select>`;
    document.getElementsByClassName('extra')[0].innerHTML += toBeAdded+toBeAdded;
  }


  return (
    <>
      <div>
        {Object.keys(arg).map((key, index) => {
          return (
            <div>
              <input value={key} onChange={(e) => editKey(key, e.target.value)} />
              <select name={key} defaultValue={arg[key]} onChange={(event) => editArgument(key, event.target.value)}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
          );
        })}

        <br />
        <button onClick={() => addArgument()}>+ add arg</button>
      </div>


      <div style={{ "margin-top": "40px" }}>
        <select name="start" className="start" style={mode === "start" || mode === "and" || mode === "or" ? {} : { display: 'none' }}
          onChange={(e) => editMode(e.target.value)}>
          <option value="select" selected disabled>select...</option>
          <option value="constant">constant</option>
          <option value="argument">argument</option>
          <option value="and">and</option>
          <option value="or">or</option>
        </select>

        <select name="constant" className="constant" style={mode === "constant" ? {} : { display: 'none' }}
          onChange={(e) => editConstant(e.target.value)}>
          <option value="true">true</option>
          <option value="false" selected>false</option>
        </select>

        <select name="constant" className="constant" style={mode === "argument" ? {} : { display: 'none' }}
          onChange={(e) => editSelectedArg(e.target.value)} >
          {Object.keys(arg).map((key, index) => {
            return (
              <option value={key}>{key}</option>
            );
          })}
        </select>


        <button onClick={() => { setMode("start"); setResultArg("undefined") }}>X</button>


        <div className='extra'>

        </div>


        <br />
        <p style={mode === "start" ? {} : { display: 'none' }}>result: undefined</p>
        <p style={mode === "constant" ? {} : { display: 'none' }}>result: {selectedConstant}</p>
        <p style={mode === "argument" ? {} : { display: 'none' }}>result: {arg[selectedArg] ? "true" : "false"}</p>
      </div>
    </>
  )
}

export default Main