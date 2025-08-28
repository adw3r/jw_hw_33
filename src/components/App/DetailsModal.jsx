import React from "react";
import no_image from "@assets/no-image.jpg"

export default function DetailsModal({open, onClose, data, loading}) {
    if (!open) return null
    const {
        Title,
        Poster,
        Plot,
        Year,
        Runtime,
        Genre,
        Rated,
        Released,
        Director,
        Writer,
        Actors,
        Language,
        Country,
        Awards,
        Ratings,
        Metascore,
        imdbRating,
        imdbVotes,
        BoxOffice,
        Website
    } = data || {}

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose && onClose()
    }

    return (<div className="modal d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}
                 onClick={handleBackdrop}>
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{Title || 'Loading...'}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                </div>
                <div className="modal-body text-start">
                    {loading ? (<div className="d-flex justify-content-center py-4">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>) : (<div className="row g-3">
                        <div className="col-12 col-md-4">
                            {Poster && <img src={Poster} className="img-fluid rounded" alt={Title || 'Poster'}
                                            onError={(e) => {
                                                e.target.src = no_image
                                            }}/>}
                        </div>
                        <div className="col-12 col-md-8">
                            <strong>
                                Plot:
                            </strong>
                            {Plot && <p className="mb-3">{Plot}</p>}
                            <p className="small text-muted mb-2">{Year} • {Runtime} • {Genre}</p>
                            <div className="row g-2">
                                <div className="col-6"><strong>Rated:</strong> {Rated}</div>
                                <div className="col-6"><strong>Released:</strong> {Released}</div>
                                <div className="col-12"><strong>Director:</strong> {Director}</div>
                                <div className="col-12"><strong>Writer:</strong> {Writer}</div>
                                <div className="col-12"><strong>Actors:</strong> {Actors}</div>
                                <div className="col-6"><strong>Language:</strong> {Language}</div>
                                <div className="col-6"><strong>Country:</strong> {Country}</div>
                                <div className="col-12"><strong>Awards:</strong> {Awards}</div>
                                <div className="col-6"><strong>Metascore:</strong> {Metascore}</div>
                                <div className="col-6"><strong>IMDb:</strong> {imdbRating} ({imdbVotes})</div>
                                <div className="col-6"><strong>Box Office:</strong> {BoxOffice}</div>
                                {Website && (<div className="col-12">
                                    <strong>Website:</strong> <a href={Website} target="_blank"
                                                                 rel="noreferrer noopener">{Website}</a>
                                </div>)}
                            </div>
                            {Array.isArray(Ratings) && Ratings.length > 0 && (
                                <ul className="list-group list-group-flush mt-3">
                                    {Ratings.map((r) => (<li className="list-group-item"
                                                             key={r.Source}>{r.Source}: {r.Value}</li>))}
                                </ul>)}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </div>)
}