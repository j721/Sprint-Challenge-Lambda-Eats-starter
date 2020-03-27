import React from "react";
import {Route} from "react-router-dom";
import Form from './components/Form';
import Pizza from './components/Pizza';


function App() {
  return (
    <div className="App">
    <h1>Pizza Parlor</h1>
    <Route exact path = "/" component={Form}/>
     {/* <Route path ='/pizza' component ={Pizza}/> */}
    </div>
  );
}

export default App;

