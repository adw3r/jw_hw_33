import React from 'react';
import MovieSkeleton from './MovieSkeleton.jsx';

export default function MoviesSkeletonGrid({ count = 8 }) {
    return (
        <div className="row g-3">
            {Array.from({ length: count }, (_, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                    <MovieSkeleton />
                </div>
            ))}
        </div>
    );
}
