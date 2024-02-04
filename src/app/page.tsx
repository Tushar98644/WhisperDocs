import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <Button asChild variant="secondary">
        <UserButton afterSignOutUrl="/login"/>
      </Button>
    </div>
  );
}
