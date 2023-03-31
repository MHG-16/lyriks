import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { genres, periods } from '../assets/constants';
import { useGetTopChartsByGenreAndTimeQuery } from '../redux/services/shazemCore';
import { selectGenreListId, selectPeriod } from '../redux/features/playerSlice';

const TopCharts = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId, period } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsByGenreAndTimeQuery({ genre: genreListId || 'all', period: period || 'day' });

  if (isFetching) return <Loader title="Loading soogs..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10"
      >
        <h2 className="font-bold text-3xl text-white text-left">TopCharts</h2>
        <select
          onChange={(e) => dispatch(selectPeriod(e.target.value))}
          value={period}
          className="bg-slate-600 rounded-lg outline-none
            text-gray-200 p-3 text-sm
            sm:mt-0 mt-5
            "
        >
          {periods.map((time) => (
            <option key={time.value} value={time.value}>
              {time.title}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId}
          className="bg-black text-gray-300 p-3 text-sm
          rounded-lg outline-none
          sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option
              key={genre.value}
              value={genre.value}
            >{genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start
      justify-center gap-8"
      >
        {data.chart_items.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
