import React from 'react';

const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-white font-medium text-sm truncate">
            {photo.author}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(photo.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${
            isFavourite 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/30 text-white hover:bg-white/50'
          }`}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-300 ${isFavourite ? 'scale-110 fill-current' : 'fill-none'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
