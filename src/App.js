import { useState,useEffect } from 'react';
import Loader from 'react-loader-spinner';
const url = "https://jsonplaceholder.typicode.com/albums/";

const App = () => {
  const [albums , setalbum] = useState([]);
  const [selectedalbum , setselectedalbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [openPhotos, setOpenPhotos] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchData();
  },[]); 

  const delay = ms => new Promise(r => setTimeout(r, ms));

  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    await delay(1000);
    setLoader(false)
    setalbum(data);
  }

  const handleClick = async (e) =>{
    setLoader(true);
    const res = await fetch(url + e.target.id);
    const data = await res.json();
    const res1 = await fetch(url + e.target.id +"/photos");
    const data1 = await res1.json();
    await delay(1000);
    setOpenPhotos(true);
    setLoader(false);
    setselectedalbum(data);
    setPhotos(data1);
  }

  return (
    <div>
      
      {loader? <Loader type="Oval" color="#00BFFF" height={200} width={200} style= {{textAlign: "center", display: "block" , margin: "150px auto"}}/> : null}
      {!openPhotos && !loader ? 
      <AlbumsList albums={albums} header="Album App" onClick={handleClick} />: !loader? <AlbumImage photos={photos} albumdetail={selectedalbum} /> : null
      }
    
     </div>
  );
}

const AlbumsList = (props) =>{
  const {albums, header, onClick} = props;
  return(
    <div  className="Container" >
      <h1>{header}</h1>
      <ul>
          {albums.map(({id, title}) => (                                                                                                                                                          
            <li key={id} onClick={onClick} id={id}>{title}</li>
          ))}
      </ul> 

      </div>
  );
}

const AlbumImage = (props) =>{
  const {photos, albumdetail: {title}} = props;
  const openModal = (e) =>{
    
    console.log(e.target.id);
  }
  const getRandomSize = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }
  return(
    <div  className="Container" >
       <h1>Our Gallary</h1>
      
       <p>Album Name:<span> {title} </span></p>
      
        <div className="photos-grid">
                  {photos.map(({id,thumbnailUrl,title}) => (<img src={thumbnailUrl} id={id}  onClick={openModal} alt={title} height={getRandomSize(200, 400)} /> ))}
        </div> 

    </div>
  )
}



export default App;
