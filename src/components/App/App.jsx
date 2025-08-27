import './App.scss'
import {useEffect, useState} from "react";
import Search from "./Search/Search.jsx";
import api from "@/api.js";
import Movie from "./Movie/Movie.jsx";

function App() {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async (query) => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await api.getSearchResponse(query)
            if (response?.Response === 'True' && Array.isArray(response.Search)) {
                setResults(response.Search)
            } else {
                setResults([])
                setError(response?.Error || 'No results found')
            }
        } catch (e) {
            setError(e?.message || 'Request failed')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleSearch('batman')
    }, [])

    return (
        <>
            <Search onSearch={handleSearch}/>
            <div className="container py-4">
                {isLoading && (
                    <div className="d-flex justify-content-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-warning" role="alert">{error}</div>
                )}

                {!isLoading && !error && results.length > 0 && (
                    <div className="row g-3">
                        {results.map((movie) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" >
                                <Movie data={movie} />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default App
