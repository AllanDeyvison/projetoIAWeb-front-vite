import Message from "@/models/Message";
import UserLogin from "@/models/UserLogin";

function ChatMessage({ message, user }: { message: Message, user: UserLogin }) {

    return (
        <>
               
                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                            <div className="flex items-center justify-start flex-row-reverse">
                                    <img src={user.picture} className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"/>
                            <div
                                    className="relative mr-3 text-sm bg-gray-300 
                             py-2 px-4 shadow rounded-xl"
                                    id="chat-box">
                                    <div>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
               
        </>
    )
}

export default ChatMessage;