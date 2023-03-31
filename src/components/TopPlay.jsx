import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery, useGetTopArtistsQuery } from '../redux/services/shazemCore';

import 'swiper/swiper.min.css';
// import 'swiper/modules/free-mode/free-mode.scss';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="fot-bold text-base text-white mr-3">{i + 1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.song_art_image_url}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-4">
        <Link to={`/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">
            {song?.title}
          </p>
        </Link>
        <Link to={`/artists/${song?.primary_artist.id}`}>
          <p className="text-base text-gray-300 mt-1">
            {song?.artist_names}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={() => handlePlayClick(song, i)}
    />
  </div>

);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const { data: artistsData } = useGetTopArtistsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });
  const topPlayer = data?.chart_items.slice(0, 5);
  const topArtists = artistsData?.chart_items.slice(0, 5); 

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = ({ song, i }) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="x1:ml6 ml-0 xl:mb-0 mb-0
    flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2x1">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlayer?.map((song, i) => (
            <TopChartCard
              song={song.item}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2x1">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        FreeMode
        centeredSlides
        centeredSlidesBounds
        className="mt-4"
      >
        {topArtists?.map((artist) => (
          <SwiperSlide
            key={artist?.item.id}
            style={{ width: '25%', height: 'auto' }}
            className="shadow-lg rounded-full animate-slideright"
          >
            <Link to={`/artists/${artist?.item.id}`}>
              <img
                src={artist?.item.image_url}
                alt="name"
                className="rounded-full w-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopPlay;
