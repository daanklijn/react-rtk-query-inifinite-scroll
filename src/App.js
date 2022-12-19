import { useGetPokemonByNameQuery } from "./service/pokemon";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState(0);
  const { data, isFetching } = useGetPokemonByNameQuery(page);
  const pokemon = data?.results ?? [];

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return (
    <div className="App">
      <h1>RTK Query infinite scroll</h1>
      <h2>Scroll down to automatically trigger the fetch of more data.</h2>

      {pokemon.map((p, i) => (
        <h3 key={i}>{p.name}</h3>
      ))}
    </div>
  );
}
