import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
    return ( 
        <div>
               <Button asChild variant="secondary">
                    <Link href="/sign-in">Login</Link>
                </Button>
        </div>
     );
}
 
export default Login;