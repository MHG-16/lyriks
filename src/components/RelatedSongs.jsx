import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">
      Recommendation Songs:
    </h1>

    <div className="mt-6 w-full flex flex-col">
      {data?.song_recommendations.recommendations.map((song, i) => (
        <SongBar
          key={song.recommended_song.id}
          song={song.recommended_song}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
