// React is loaded and is available as React and ReactDOM
// imports should NOT be used
const OPERATIONS = {
    ADD: "ADD",
    SUBTRACT: "SUBTRACT"
  };
  
  function App() {
    const [number, updateNumber] = React.useState(0);
  
    const [state, dispatch] = React.useReducer((state, action) => {
      /* implement the reducer which should update the state based on the action */
      return state;
    }, 0);
  
    /* implement dispatches */
    const add = () => dispatch();
    const subtract = () => dispatch();
  
    const handleNumberChange = e => updateNumber(Number(e.target.value));
  
    return (
      <div>
        <div id="result">{state}</div>
        <div>
          <button id="add" onClick={add}>Add</button>
          <button id="subtract" onClick={subtract}>Subtract</button>
        </div>
        <div>
          <input type="text" value={number} onChange={handleNumberChange} />
        </div>
      </div>
    );
  }
  
  document.body.innerHTML = "<div id='root'></div>";
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);