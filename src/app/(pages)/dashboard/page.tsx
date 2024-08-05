import { getServerAuthSession } from "@/server/auth";

const DashBoard = async () => {
  const session = await getServerAuthSession();
  console.log(session?.user.name);
  return <div>Admin</div>;
};

export default DashBoard;
