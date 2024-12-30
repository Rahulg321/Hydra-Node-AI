import { signOut } from "@/auth";
import { Button } from "./ui/button";

export default function SignOutButton() {


  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant={"link"} className="mt-4 w-full text-baseC">
        Sign Out
      </Button>
    </form>
  );
}
