import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pokemonList">Pokemon List</Link>
            <p>Click on the Pokemon List to fetch the pokedex data</p>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;