import Search from "@/components/search/Search";

interface Props {
  searchParams: {
    searchTerm: string;
    page: string;
  };
}

const SearchPage = ({ searchParams }: Props) => {
  return (
    <div className="flex mx-auto w-full">
      <Search page={searchParams.page} searchTerm={searchParams.searchTerm} />
    </div>
  );
};
export default SearchPage;
