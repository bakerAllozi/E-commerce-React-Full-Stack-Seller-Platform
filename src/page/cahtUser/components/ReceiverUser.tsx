import { ChatMessageType } from '@/types/chats.type';

function ReceiverUser({
  handleNavigate,
  e,
  userId,
  onlineUsers =[''],
}: {
  handleNavigate: (receiverId: string) => void;
  e: ChatMessageType;
  userId: string;
  onlineUsers: string[];
}) {
  const useOnline = onlineUsers.find((user) => String(user) === e.sender_id);

  return (
    <div className="flex gap-4 justify-center flex-wrap cursor-pointer bg-gray-100 p-5 rounded-lg shadow-lg">
      <div
        key={e.message_id}
        className="border-[1px] bg-white relative w-64 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={() =>
          handleNavigate(e.sender_id === userId ? e.receiver_id : e.sender_id)
        }
      >
        <div className="w-16 h-16 cursor-pointer relative rounded-full overflow-hidden flex justify-center items-center mb-4 mx-auto">
          {e.avatar ? (
            <img
              src={e.avatar}
              alt="User Avatar"
              className="absolute top-0 left-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex justify-center items-center text-white font-bold">
              <span>{e.name?.charAt(0) || 'U'}</span>
            </div>
          )}

          {useOnline && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white "></span>
          )}
        </div>

        <p className="font-extrabold text-center mb-1">{e.name}</p>
        {useOnline && (
          <p className="text-green-500 text-center text-sm font-semibold ">
            online
          </p>
        )}
    
      </div>
    </div>
  );
}

export default ReceiverUser;
