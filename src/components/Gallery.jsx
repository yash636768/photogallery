import React, { useState, useMemo, useCallback, useReducer } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, initialState } from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, initialState);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-rose-50 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-rose-900">Oops! Something went wrong</h3>
        <p className="text-rose-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-rose-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Photo <span className="text-blue-600">Gallery</span>
        </h1>
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by author..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-full border-none bg-white py-4 pl-12 pr-6 shadow-xl ring-1 ring-slate-200 transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 md:text-lg"
          />
        </div>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-xl text-slate-500">No photos found for "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
