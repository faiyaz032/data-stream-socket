import socketClient from 'socket.io-client';
import './App.css';
import logo from './logo.svg';

const SERVER = 'http://localhost:5000';

function App() {
   // initialize socket on frontend
   const socket = socketClient(SERVER);

   //by calling the getUpdatedData function you can get the recent updated data from database.
   function getUpdatedCoords() {
      return new Promise(function (resolve, reject) {
         socket.on('getUpdatedCoords', (data) => {
            resolve(data);
         });
      });
   }

   //process to send the coods to server using socket
   function updateCoords(id, coords) {
      socket.emit('updateCoords', { id, coords });
   }

   //Geth the Users location
   navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      //By passing the mongodb document id and updated coords array into this function, It will save the new coords to database realtime.
      updateCoords('616282dc09b498127d797215', [longitude, latitude]); //* You need to pass longitude first not the latitude for geojson formating
   });

   //call to get the recent updated data from database. You can also use await insted of then inside any await function
   getUpdatedCoords().then((val) => {
      console.log(val);
   });

   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
               Edit <code>src/App.js</code> and save to reload.
            </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
               Learn React
            </a>
         </header>
      </div>
   );
}

export default App;
