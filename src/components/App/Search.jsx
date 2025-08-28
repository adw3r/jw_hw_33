import React from "react";

export default function Search({onSearch}) {
    const onSubmit = async (e) => {
        e.preventDefault()
        const query = e.target.elements.search.value.trim()
        if (onSearch) {
            await onSearch(query)
        }
    }
    return (<div className="container-fluid py-4 d-flex flex-column gap-2">
            <h2 className="text-center">Search</h2>
            <form onSubmit={onSubmit} className="d-flex gap-2">
                <input name="search" type="text" className="form-control" placeholder="Search..."/>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
        </div>)
}