import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (newSearchValue: string) => void;
  resetPage: () => void;
}

export default function SearchBox({ value, onSearch, resetPage }: SearchBoxProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    resetPage();
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      defaultValue={value}
      onChange={handleSearch}
    />
  );
}
