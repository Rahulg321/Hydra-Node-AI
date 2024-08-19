import { auth } from "@/auth";
import { useSession } from "next-auth/react";

const useCurrentUser = async () => {
  const session = await useSession();
  return session.data?.user;
};

export default useCurrentUser;
