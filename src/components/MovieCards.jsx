import "../css/MovieCard.css"

const MovieCards = ({ movie }) => {
  const { title, releaseDate, url } = movie || {}

  function onFavoriteClick() {
    alert(`You favorited ${title}!`)
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={url} alt={title} className="movie-poster-image" />
        <div className="movie-overlay">
          <button className="favorite-button" onClick={onFavoriteClick}>
            ♥
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{title}</h3>
        <p>{releaseDate?.split("-")[0]}</p>
      </div>
    </div>
  )
}

export default MovieCards
