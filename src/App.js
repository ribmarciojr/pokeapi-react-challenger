import { memo ,useEffect, useState } from 'react';
import './App.css';

const Pokemon = memo(({name, url}) => {
  const [pokeDetails, setPokeDetails] = useState([])

  useEffect(() => {
    fetch(url)
      .then(json => json.json())
      .then(response => {
        //console.log(response)
        setPokeDetails(response)})
  }, [url])

  
  if( pokeDetails.length === 0 ){ //recognize when pokeDetails it's just an empty Array
    return <div>-</div>
  }

  return(
     <div className='pokdex-content-container'>      
      <div className='poke-img-container'>
        <img alt={name} src={pokeDetails.sprites.front_default} />
      </div>
      
      <div className='poke-text-container'>
        <h2>{name}</h2>
        <p>EXP: {pokeDetails.base_experience}</p>
      </div>
          
    </div>
  )
})

export const  App = () => {
  const [allPokemons, setAllPokemons] = useState([])
  const [filteredPokemons, setfilteredPokemons] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=200')
    .then(json => json.json())
    .then(response => { 
      return setAllPokemons(response.results.sort((a, b) => {
        return a.name.localeCompare(b.name)
     }))}) //retorna results: nome e url
  }, [])
  
  useEffect(() => {
    setfilteredPokemons(allPokemons)
  }, [allPokemons])

  const handleSearch = ({target: {value}}) => {
    setfilteredPokemons(allPokemons.filter(pokemon => {
      return pokemon.name.includes(value.toLowerCase())
    }))
  }
 
  return (
    <section>
      <h1 style={{margin: 30}} >POKEAPI INTEGRATION CHALLENGE:</h1> 

      <input className='input-search'
      type='search' 
      onChange={(e) => handleSearch(e)} 
      placeholder='Find your favourite:'/> 

      <div className='pokedex-container'> 
        
        {          
          !!allPokemons && filteredPokemons.map(poke => {
            return (
              <div >
               <Pokemon key={poke.name} url={poke.url} name={poke.name} />
              </div>
            )
          }) 
        } 
      </div>     
    </section>
  );
}


