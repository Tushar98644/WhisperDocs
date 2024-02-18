import ChatWindow from "@/components/chat_window/chat_window";
import Sidebar from "@/components/sidebar/sidebar";
import { Fragment } from "react";

const ChatPage = () => {
    return ( 
        <div className="grid grid-cols-4">
              <Sidebar />
              <ChatWindow />
        </div>
     );
}
 
export default ChatPage;