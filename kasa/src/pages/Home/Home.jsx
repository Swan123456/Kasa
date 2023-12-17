import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
      const [data, setData] = useState([]);

      useEffect(() => {
            axios.get('/logements.json').then((res) => setData(res.data)); //requète AXIOS ici également pour prochaine utilisation API
      }, []);

      return (
            <>
                  <div className="cards-container">
                        {data.map((appart, id) => (
                              <div className="card_logement" key={id}>fgdsfg</div>
                        ))}
                  </div>
            </>
      );
}
