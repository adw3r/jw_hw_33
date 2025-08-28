import React from "react";
import './App.scss'
import {useCallback, useEffect, useState} from "react";
import Search from "./Search.jsx";
import api from "@/api.js";
import DetailsModal from "./DetailsModal.jsx";
import MoviesGrid from "./MoviesGrid.jsx";
import MoviesSkeletonGrid from "./MoviesSkeletonGrid.jsx";

function App() {
    const [results, setResults] = useState([])
    const [isListLoading, setIsListLoading] = useState(false)
    const [isDetailLoading, setIsDetailLoading] = useState(false)
    const [error, setError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    const [query, setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const performSearch = async (q, page = 1) => {
        try {
            setIsListLoading(true)
            setError(null)
            const response = await api.getSearchResponse(q, page)
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
                const totalResults = Number(response.totalResults || 0)
                setTotalPages(Math.max(1, Math.ceil(totalResults / 10)))
            } else {
                setResults([])
                setTotalPages(1)
                setError(response?.Error || 'No results found')
            }
        } catch (e) {
            setError(e?.message || 'Request failed')
        } finally {
            setIsListLoading(false)
        }
    }

    const handleSearch = async (q) => {
        setQuery(q)
        setCurrentPage(1)
        await performSearch(q, 1)
    }

    const goToPage = async (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return
        setCurrentPage(page)
        await performSearch(query, page)
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
        (async () => {
            setQuery('batman')
            await performSearch('batman', 1)
        })()
    }, [])

    return (
        <>
            <Search onSearch={handleSearch}/>
            <div className="container-fluid py-4 col-12" style={{minHeight: 'calc(100vh - 100px)'}}>
                {isListLoading && (
                    <MoviesSkeletonGrid count={8} />
                )}

                {error && (
                    <div className="alert alert-warning" role="alert">{error}</div>
                )}

                {results.length > 0 && (
                    <>
                        <MoviesGrid items={results} onSelect={handleSelect}/>
                        <nav className="mt-4" aria-label="Pagination">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Prev
                                    </button>
                                </li>
                                <li className="page-item disabled">
                                    <span className="page-link">Page {currentPage} / {totalPages}</span>
                                </li>
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
            </div>

            <DetailsModal open={modalOpen} onClose={() => setModalOpen(false)} data={modalData}
                          loading={isDetailLoading}/>
        </>
    )
}

export default App
