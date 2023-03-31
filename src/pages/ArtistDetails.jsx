import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { DetailsHeader, Loader, PopularSongs } from '../components';

import {
  useGetArtistDetailsQuery, useGetPopularSongsByArtistQuery,
} from '../redux/services/shazemCore';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text font-semibold text-white">
      {isReadMore ? text.slice(0, 450) : text}
      <span onClick={toggleReadMore} className="text-gray-400 font-bold text-xl cursor-pointer underline:hover">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

const ArtistDetails = () => {
  const { id: artistid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails } = useGetArtistDetailsQuery(artistid);
  const { data: songsData, isFetchingSongsData } = useGetPopularSongsByArtistQuery(artistid);
  console.log(songsData);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, songsData, i }));
    dispatch(playPause(true));
  };

  if (isFetchingArtistDetails || isFetchingSongsData) { return <Loader title="Searching artist details" />; }
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistid} artistData={artistData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Details:
        </h2>
        <div className="mt-5">
          <ReadMore>
            {artistData?.artist.description_preview}
          </ReadMore>
        </div>
      </div>
      <PopularSongs
        data={songsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
