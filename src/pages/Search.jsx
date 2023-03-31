import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongSearchCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazemCore';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <Loader title="Loading soogs..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10"
      >
        <h2 className="font-bold text-3xl text-white text-left">Results</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start
      justify-center gap-8"
      >
        {data?.hits.map((song, i) => (
          <SongSearchCard
            key={song.result.id}
            song={song.result}
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
