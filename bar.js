import { getSession } from "next-auth/react";

export default function Dashboard({ user }: any) {
  return <h1>Welcome {user?.name}</h1>;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}
