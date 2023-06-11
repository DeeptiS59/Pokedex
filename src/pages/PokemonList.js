import { useEffect, useState } from "react";

function PokemonList() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [totalCount, setTotalCount] = useState([])

  const fetchPokemonData = (pageNo, searchTerm = "") => {
    fetch("http://localhost:3030/pokemons?_limit=10&_page=" + pageNo + "&name_like=" + searchTerm)
      .then(response => {
        setTotalCount(response.headers.get("X-Total-Count"))
        return response.json()
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
  }


  useEffect(() => {
    fetchPokemonData(currentPage)
  }, [])
  function prev() {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = 1;
    }
    setCurrentPage(newPage);
    fetchPokemonData(newPage, searchTerm);
  }
  function nxt() {
    let newPage = currentPage + 1;
    var maxPage = Math.ceil(totalCount / 10);
    if (newPage > maxPage) {
      newPage = maxPage;
    }
    setCurrentPage(newPage);
    fetchPokemonData(newPage, searchTerm);
  }
  function search(searchTerm) {
    setSearchTerm(searchTerm)
    setCurrentPage(1);
    fetchPokemonData(1, searchTerm)

  }
  return <>
    <h1>Pokemon List</h1>

    <label>Search</label>
    <input onInput={e => search(e.target.value)} type="text" id="search"></input>
    {data.length > 0 && (
      <ul>

        {data.map(pokemon => (
          <PokemonCard id={pokemon.id} name={pokemon.name} hp={pokemon.hp} type={pokemon.type} img={pokemon.url} attack={pokemon.attack} defense={pokemon.defense} spAttack={pokemon.spAttack} spDefense={pokemon.spDefense} speed={pokemon.speed} total={pokemon.total} />
        ))}
      </ul>

    )}
    <center>
      <button onClick={prev} id="previous" disabled={currentPage <= 1}><b>Previous</b></button>
      <button onClick={nxt} id="next" disabled={currentPage >= Math.ceil(totalCount / 10)}><b>Next</b></button>
      <p>Total Count: {totalCount}</p>
      <p id="pagination">Page {currentPage} of {totalCount > 0 ? Math.ceil(totalCount / 10) : 1}</p>
    </center>
  </>
};
function PokemonCard(props) {

  return <>

    <div class="card" style={{ backgroundColor: 'cyan' }}>
      <div class="card-body">
        <h4 class="card-title">Rank:{props.id}</h4>
        <h4 class="card-title" id="name">{props.name}</h4>
        <p class="card-head">
          <img src={props.img}
            alt={props.name} width="112" height="84"></img>
        </p>
        <p class="card-head">Type: {props.type}</p>
        <p class="card-head">HP: {props.hp}</p>
        <p class="card-head">Attack: {props.attack}</p>
        <p class="card-head">Defense: {props.defense}</p>
        <p class="card-head">Special Attack: {props.spAttack}</p>
        <p class="card-head">Special Defense: {props.spDefense}</p>
        <p class="card-head">Speed: {props.speed}</p>
        <p class="card-head">Total CP: {props.total}</p>
      </div>
    </div>

  </>;
}

export default PokemonList;