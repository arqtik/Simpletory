import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const [items, setItems] = useState([]);
  useEffect(() => {
     fetch('http://localhost:8080/api/items')
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           setItems(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      {items.map((item) => {
         return (
            <div className='card' key={item.id}>
               <div className='card-body'>
                  <h5 className='card-title'>{item.name}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>{item.mass}{item.unit}</h6>
                  <p className='card-text'>Count: {item.count} | Price: {item.price}</p>
                  <a href={'/item/'+item.id} className='btn btn-light'>Edit</a>
               </div>
            </div>
         );
      })}
      </header>
    </div>
  );
}

export default App;
