import { Home, Settings } from "lucide-react";
import Link from "next/link";

interface ListItem {
    icon: any;
    text: string;
}

const ListItem = ({ icon, text } : ListItem) => {
    const route_text = text.toLowerCase();
    return (
        <Link href={route_text} className="flex flex-row gap-2 hover:bg-black mx-6 p-2 rounded-[0.4vw]">
            {icon}
            <p>{text}</p>
        </Link>
    );
}
const Sidebar = () => {
    return (
        <div className="h-screen bg-red flex flex-col gap-4 w-1/5">
            <p>Whisper Docs</p>
            <ul>
                <ListItem icon={<Home />} text="Home" />
                <ListItem icon={<Settings />} text="Settings" />
            </ul>
        </div>
    );
}

export default Sidebar;