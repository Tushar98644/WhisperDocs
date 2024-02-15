import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <Dropzone />
      <Button asChild variant="secondary">
        <UserButton afterSignOutUrl="/login" />
      </Button>
    </div>
  );
}
