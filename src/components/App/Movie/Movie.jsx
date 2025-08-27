import './style.scss'
import api from "@/api.js"
import no_image from "@/assets/no-image.jpg"

export default function Movie({ data }) {
    if (!data) return null
    console.log(data)
    const {
        Title,
        Poster,
        Year,
        Type,
        imdbID
    } = data

    return (
        <div className="card shadow-sm" onClick={async (e) => {
            let resp = await api.getById(imdbID).then()
            console.log(resp)
        }}>
            <img src={Poster} className="card-img-top" alt={Title || 'Poster'} onError={(e) => {
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