import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => (
  <div className="relative w-full flex flex-col mb-8">
    <div className="w-full bg-gradient-to-l from transparent to black sm:h-48 h-28">
      <div className="absolute inset-0 flex items-center">
        <img
          alt="art"
          src={artistId ? artistData?.artist.image_url : songData?.song.song_art_image_url}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover
        border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {songData?.song.title || artistData?.artist.name}
          </p>
          <Link to={`/artists/${songData?.song.primary_artist.id}`}>
            <p className="font-bold sm:text-2xl text-xl text-gray-300">
              {songData?.song.artist_names}
            </p>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default DetailsHeader;
