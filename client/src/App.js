import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from "./components/Landing";
import Home from "./components/Home";
import RecipeCreate from "./components/RecipeCreate";
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
    <Route path="/" element={<Landing/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/home/:id" element={<Detail/>}/>
    <Route path="/recipe" element={<RecipeCreate/>} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
