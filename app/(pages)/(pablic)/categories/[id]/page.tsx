import Categories from "@/components/categories/Categories";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    page: string;
  };
}

const CategoriesPage = ({ params, searchParams }: Props) => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <Categories categoryId={params.id} page={searchParams.page} />
    </div>
  );
};
export default CategoriesPage;
