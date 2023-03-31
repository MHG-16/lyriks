import SongBar from './SongBar';

const PopularSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">
      Popular Songs:
    </h1>

    <div className="mt-6 w-full flex flex-col">
      {data?.songs.slice(0, 10).map((song, i) => (
        <SongBar
          key={song.id}
          song={song}
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

export default PopularSongs;
