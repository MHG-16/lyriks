import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Markup } from 'interweave';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazemCore';

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: SongData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);
  const { data, isFetching: isFetchingRecommendationsSongs, error } = useGetSongRelatedQuery(songid);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const description = SongData?.song.description.html;

  if (isFetchingSongDetails || isFetchingRecommendationsSongs) return <Loader title="Searching song details" />;

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistsId="" songData={SongData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Details:
        </h2>
        <div className="mt-5">
          {
            SongData ? <Markup content={description} className="text-gray-400 text-base my-1" />
              : <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>
          }
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
