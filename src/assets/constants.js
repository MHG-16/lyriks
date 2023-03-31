import { HiOutlineHashtag, HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi';

export const genres = [
  { title: 'All', value: 'all' },
  { title: 'Rap', value: 'rap' },
  { title: 'Pop', value: 'pop' },
  { title: 'Rb', value: 'rb' },
  { title: 'Rock', value: 'rock' },
  { title: 'Country', value: 'country' },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];

export const periods = [
  { title: 'Day', value: 'day' },
  { title: 'All_time', value: 'all_time' },
  { title: 'Month', value: 'month' },
  { title: 'Week', value: 'week' },
];
