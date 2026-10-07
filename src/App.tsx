import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", time: "18 h 10", seats_left: 1, poster: posterAube },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", time: "19 h 30", seats_left: 0, poster: posterMemoire },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", time: "21 h 00", seats_left: 7, poster: posterOrbite },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredFilms = useMemo(
    () => films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => setQuery("")}>CinéScope</button>
        <div className="menu">
          <a href="#programme">Programme</a>
          <a href="#infos">Informations</a>
        </div>
      </header>

      <div className="page">
        <h1>Films à l’affiche</h1>
        <h2 className="intro">Découvrez la programmation de cette semaine.</h2>
        <input
          className="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div id="programme" className="film-grid">
          {filteredFilms.map((film) => (
            /* C'est une div avec un onClick, pas certain que ça soit la meilleure solution ici */
            <div className="film-card" key={film.id} tabIndex={0} role="button" onClick={() => setSelected(film.title)}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected(film.title);
                }
              }}
            >
              <img src={film.poster} />
              <div className="film-content">
                <h3>{film.title}</h3>
                <p>{film.genre} · {film.time}</p>
                <button
                  className="favorite"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(film.id);
                  }}
                >
                  {favorites.includes(film.id) ? "★" : "☆"}
                </button>
                <div className={film.seats_left != 0 ? "availability available" : "availability unavailable"}>
                  <div className="availability-text">{film.seats_left == 0 ? "Pas de " : film.seats_left} place{film.seats_left > 1 ? 's' : ''} disponible{film.seats_left > 1 ? 's' : ''}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected && <p className="selection">Film sélectionné : {selected}</p>}
      </div>
    </>
  );
}

