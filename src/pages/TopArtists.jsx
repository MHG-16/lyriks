import { Error, Loader, ArtistCard } from '../components';
import { useGetTopArtistsQuery } from '../redux/services/shazemCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopArtistsQuery();

  if (isFetching) return <Loader title="Loading soogs..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10"
      >
        <h2 className="font-bold text-3xl text-white text-left">TopArtists</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start
      justify-center gap-8"
      >
        {data?.chart_items.map((artist) => (
          <ArtistCard key={artist} artist={artist.item} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
