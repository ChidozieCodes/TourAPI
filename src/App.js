import './App.css';
import React, {useState, useEffect} from 'react';
import './mediaquery.css'

const url = 'https://course-api.com/react-tours-project';

function App() {
//setting of the useStates
const [loading, setLoading] = useState(true);
const [tour, setTours] = useState([]);

//Remove function for not interested
const removeTour = (id) => {
    let newTours = tour.filter((tourss) => tourss.id !== id);
    setTours(newTours);
}

//Fetchs the datas from the API url
const fetchTours = async () => {
  setLoading(true);
try {
    const response = await fetch(url);
    const tours = await response.json();
    setLoading(false);
    setTours(tours);
    console.log(tours);

  } catch (error) {
    setLoading(false);
    console.log(error);
  }
  };

//useEffect for fetchTours() to avoid rendering multiple times
useEffect (() => {

  fetchTours();

}, []);

//This will display if the data from the API has not been fetched
if (loading) {
  return (
    <section className='tourHolder'>
      <h1>Loading...</h1>
    </section>
    
  )
};
//Will return this htmml 
if (tour.length === 0){
    return (
      <section className='tourHolder'>
      <h1>No Tours Left</h1>
      <button className='refresh' onClick={() => fetchTours()}>Refresh</button>
    </section>
    )
}

//This will display after fetching the datas from the API
return (
     <main>
      <Tours toured={tour} removeTour={removeTour} />
     </main>
  )
  
};

//Function that Loops HTML of each data from API
const Tours = ({toured, removeTour}) => {

  const [readMore, setReadMore] = useState(false);
  return (
    <section className='tourHolder'>
      <h1>Our Tours</h1>
      <div>
        {toured.map((tour) => {
          const {id, image, info, name, price} = tour;
          return (
        <article className='tour1' key={id}>
          <img src={image} className='tourImg' alt='pic'/>
           <div className='tourDescription'>
             <div className='tour-info'>
               <h4 className='head1'>{name}</h4>
               <h4 className='head2'>${price}</h4>
               <p>
                 {readMore ? info : `${info.substring(0,200)}...`}

                 <button onClick={() => setReadMore(!readMore)} className='readmore'>
                    {readMore ? 'show less' : 'Read More'}
                  </button>
               </p>
               
             </div>
             <button className='notInterested' onClick={() => removeTour(id)}>Not Interested</button>
           </div>
         </article>
          )
        })}
      </div>
    </section>
  )
};


export default App;
