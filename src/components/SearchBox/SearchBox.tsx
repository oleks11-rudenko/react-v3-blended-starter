import css from './SearchBox.module.css';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
  resetPage: () => void;
}

export default function SearchBox({ searchQuery, setSearchQuery, resetPage }: SearchBoxProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    resetPage();
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      defaultValue={searchQuery}
      onChange={handleSearch}
    />
  );
}
