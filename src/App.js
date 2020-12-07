import React, { Component , useState , useEffect} from 'react';
import 'bootswatch/dist/slate/bootstrap.min.css';
import { render } from '@testing-library/react';
//using react hooks,useState and useEffect are react hooks
//useEffect is a function that takes another fn as an argument 

//news app
const App = () =>{
  const [news, setNews] = useState([]);
  const [searchquery, setSearchquery] = useState('general affairs');
  const [url, setUrl] =useState('http://hn.algolia.com/api/v1/search?')
  const [loading, setLoading] =useState(false);


const fetchNews =()=>{
//set loading to true

  setLoading(true);
  fetch(url)
  .then(result => result.json())//converting the result to json
  .then(data => (setNews(data.hits),setLoading(false)))
  .catch(error => console.log(error))
};

useEffect(()=>{

  fetchNews()
},[url]);//when there is a change in search query then apply useEffect 

const handleChange =(e)=>{
  setSearchquery(e.target.value);

}

const handleSubmit = (e) =>{
 e.preventDefault();
 setUrl(`http://hn.algolia.com/api/v1/search?query=${searchquery}`)

}



return(
  <div>
   <center><form onSubmit={handleSubmit}>
      <input type="text" value ={searchquery} onChange={handleChange} size="150" width="150" />
      <button>Search</button>
    </form>
  

   <h1>{`News related to ${searchquery}`}</h1>
   
   
    {loading ? <h3>Loading...please wait</h3> : ""}</center>
  {news.map((n,i) =>(<p key={i}><a href={`http://hn.algolia.com/api/v1/search?query=${searchquery}`}>{n.title}</a></p>))}
    
    
  

</div>
);

}
/*
//counter app
 const App = () =>{
  const [count, setCount] = useState(0);

  useEffect(()=>{
    document.title=`clicked ${count} times`
  })


const increment =() =>{
  setCount(count + 1);
};

return(
  <div>
  <center><h1>Counter App</h1></center>
  <center><button onClick = {increment}>You have clicked {count} times</button></center>
  </div>

)
};







//using old react coding
class App extends Component {
  state ={
    count : 0
  }

  increment = () => {
    this.setState({
      count : this.state.count + 1
    });
    
  }
  render(){
  return (
    <div>
  <center><h1>Counter App</h1></center>
  <center><button onClick = {this.increment}>You have clicked {this.state.count} times</button></center>
  </div>
  )
  }
}
*/
export default App;

