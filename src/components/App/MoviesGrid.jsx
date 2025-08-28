import React from "react";
import Movie from "./Movie.jsx";

export default function MoviesGrid({items, onSelect}) {
    if (!Array.isArray(items) || items.length === 0) return null
    return (
        <div className="row g-3">
            {items.map((movie) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={movie.imdbID}>
                    <Movie data={movie} onSelect={onSelect}/>
                </div>
            ))}
        </div>
    )
}


