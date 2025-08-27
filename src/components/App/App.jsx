import './App.scss'
import {useEffect, useState, useCallback} from "react";
import Search from "./Search.jsx";
import api from "@/api.js";
import DetailsModal from "./DetailsModal.jsx";
import MoviesGrid from "./MoviesGrid.jsx";

function App() {
    const [results, setResults] = useState([])
    const [isListLoading, setIsListLoading] = useState(false)
    const [isDetailLoading, setIsDetailLoading] = useState(false)
    const [error, setError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    const handleSearch = async (query) => {
        try {
            setIsListLoading(true)
            setError(null)
            const response = await api.getSearchResponse(query)
            if (response?.Response === 'True' && Array.isArray(response.Search)) {
                const seen = new Set()
                const unique = []
                for (const item of response.Search) {
                    if (!seen.has(item.imdbID)) {
                        seen.add(item.imdbID)
                        unique.push(item)
                    }
                }
                setResults(unique)
            } else {
                setResults([])
                setError(response?.Error || 'No results found')
            }
        } catch (e) {
            setError(e?.message || 'Request failed')
        } finally {
            setIsListLoading(false)
        }
    }

    const handleSelect = useCallback(async (imdbID) => {
        try {
            setModalOpen(true)
            setIsDetailLoading(true)
            setError(null)
            const detail = await api.getById(imdbID)
            setModalData(detail)
        } catch (e) {
            setError(e?.message || 'Failed to load details')
        } finally {
            setIsDetailLoading(false)
        }
    }, [])

    useEffect(() => {
        handleSearch('batman')
    }, [])

    return (
        <>
            <Search onSearch={handleSearch}/>
            <div className="container py-4">
                {isListLoading && (
                    <div className="d-flex justify-content-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-warning" role="alert">{error}</div>
                )}

                {results.length > 0 && (
                    <MoviesGrid items={results} onSelect={handleSelect} />
                )}
            </div>

            <DetailsModal open={modalOpen} onClose={() => setModalOpen(false)} data={modalData} loading={isDetailLoading} />
        </>
    )
}

export default App
