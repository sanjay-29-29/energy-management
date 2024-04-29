import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function dataFetcher() {
  const [data, setData] = useState([]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const intervalId = setInterval(() => {
      axios.get('http://127.0.0.1:8000/get_next')
        .then(response => {
          const newData = response.data;
          setData(prevData => [newData]);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    },1000);  
    return () => clearInterval(intervalId);
  });

  return data;
}

export default dataFetcher;
