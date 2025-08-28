import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function MovieSkeleton() {
    return (
        <div className="card h-100 skeleton-card">
            <Skeleton height={300} className="card-img-top"/>
            <div className="card-body">
                <Skeleton height={24} className="mb-2"/>
                <Skeleton height={20} width="60%" className="mb-2"/>
                <Skeleton height={16} width="40%"/>
            </div>
        </div>
    );
}
