import UserProfile from "@/components/user/UserProfile";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    page: string;
  };
}

const UserProfilePage = ({ params, searchParams }: Props) => {
  return <UserProfile userId={params.id} page={searchParams.page} />;
};
export default UserProfilePage;
