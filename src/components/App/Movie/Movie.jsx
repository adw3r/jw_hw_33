import './style.scss'
import no_image from "@/assets/no-image.jpg"
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
        <div className="card shadow-sm" role="button" onClick={() => onSelect && onSelect(imdbID)}>
            <img src={Poster} loading="lazy" className="card-img-top" alt={Title || 'Poster'} onError={(e) => {
                e.target.src = no_image
            }}/>
            <div className="card-body d-flex flex-column" >
                <h5 className="card-title">{Title}</h5>
                <span className="card-text small text-muted mb-2">
                    {Year}
                </span>
                <span className="card-text">{Type}</span>
            </div>
        </div>
    )
}

const Movie = memo(MovieComponent)
export default Movie