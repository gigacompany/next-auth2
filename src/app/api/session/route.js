import { getServerSession } from "next-auth";
import { getSession } from "next-auth/client";
import { useRouter } from "next/navigation";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const route = useRouter()

  if (session) {
    // You have access to the user's session here
    const user = session.user;
    return user
  } else {
    router.push('/login1')
    return null
  }

  
}
