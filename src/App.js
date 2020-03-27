import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";
import Form from './components/Form';
import Pizza from './components/Pizza';

// function Home(props){
//   const {push} = props.history;
//   return (
//     <div>
//     <h3>Home</h3>
//     <button onClick ={()=> push("/")}>Home</button>
//     </div>)
// }




function App() {
  return (
    <div className="App">
    <h1>Pizza Parlor</h1>
    <Route exact path = "/" component={Form}/>
     <Route path ='/pizza' component ={Pizza}/>
    </div>
  );
}

export default App;

