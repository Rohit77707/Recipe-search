import React,{useState} from 'react'
import './App.css'
import Axios from 'axios'
import Recipe from './components/Recipe'
import {v4 as uuidv4} from "uuid"
import Alert from './components/Alert'
const App = () => {
    const App_Id="0589ca43"
    const App_Key="3cb58599c26c5a636e6693e9dfa8cc9d	"
    const [query,setQuery]=useState("");
    const Url=`https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`
    const [recipes, setRecipes]=useState([]);
    const [alert, setAlert] = useState("");
    const onChange= (e) =>{
        setQuery(e.target.value);
    }
    const getData = async() =>{
        if (query !== "") {
            const result = await Axios.get(Url);
            if (!result.data.more) {
              return setAlert("No food with such name");
            }
            setRecipes(result.data.hits);
            setQuery("");
            setAlert("");
          } else {
            setAlert("Please fill the form");
          }
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        getData();
    }
  return (
    <div className='App'>
        <h1 onClick={getData}>Food Searching App</h1>
        <form className='search-form' onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
            <input type="text" placeholder="Search-dish" autoComplete='off' onChange={onChange} value={query}/>
            <input type="submit" value="Search" />

        </form>
        <div className="recipes">
            {recipes!==[] && recipes.map(recipe =><Recipe key={uuidv4()} recipe={recipe} />)}
        </div>  
    </div>
  )
}

export default App