import no_image from "@assets/no-image.jpg"
import { memo } from 'react'

function MovieComponent({ data, onSelect }) {
    if (!data) return null
    const {
        Title,
        Poster,
        Year,
        Type,
        imdbID
    } = data

    return (
        <div className="card shadow-sm h-100 movie-card" role="button" onClick={() => onSelect && onSelect(imdbID)}>
            <div className="ratio ratio-2x3 bg-light">
                <img src={Poster} loading="lazy" className="card-img-top object-fit-cover" alt={Title || 'Poster'} onError={(e) => {
                    e.target.src = no_image
                }}/>
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title flex-grow-1">{Title}</h5>
                <div>
                    <span className="card-text small text-muted me-2">{Year}</span>
                    <span className="card-text">{Type}</span>
                </div>
            </div>
        </div>
    )
}

const Movie = memo(MovieComponent)
export default Movie