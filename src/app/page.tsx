import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <Button asChild variant="secondary">
        {/* <Link href="/login">Login</Link> */}
        <UserButton afterSignOutUrl="/"/>
      </Button>
    </div>
  );
}
