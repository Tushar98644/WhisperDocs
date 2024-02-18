import { Home, Settings } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

interface ListItem {
    icon: any;
    text: string;
}
const ListItem = ({ icon, text } : ListItem) => {
    return (
        <li className="flex flex-row gap-2">
            {icon}
            <p>{text}</p>
        </li>
    );
}
const Sidebar = () => {
    return (
        <div className="h-screen bg-red flex flex-col gap-4 col-span-1">
            <p>Whisper Docs</p>
            <ul>
                <ListItem icon={<Home />} text="Home" />
                <ListItem icon={<Settings />} text="Settings" />
            </ul>
        </div>
    );
}

export default Sidebar;