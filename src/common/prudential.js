
// 深圳保诚科技面试总结 笔试题

function update(progressBarId, increase) {
  // Write the code that goes here
  function a(n) {
    return increase + n
  }
  const result = a()
  let value = document.getElementById(progressBarId).attributes('value')
  if(result >= 100) {
      document.getElementById(progressBarId).setAttribute('value',100);
      return true;
  }else {
      document.getElementById(progressBarId).setAttribute('value',result)
      return false;
  }
 
}

// Example case. 
document.body.innerHTML = `<progress id="loading-bar" value="0" max="100"></progress>`;
console.log(update("loading-bar", 50)); // should return false and loading-bar's value should be 50.
console.log(update("loading-bar", 50)); // should return true and loading-bar's value should be 100.


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