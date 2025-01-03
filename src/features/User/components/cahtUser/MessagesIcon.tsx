import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useRedux from "../../../../hooks/useRedux";

function MessagesIcon() {
  const { appSelector } = useRedux();
  const { ReceiverChat } = appSelector((state) => state.UserData);

  return (
    <>
      {ReceiverChat.length > 0 || (
        <div className=" relative">
          <Link to="/Messages" className=" relative ">
            <FontAwesomeIcon
              icon={faComment}
              className=" w-6 h-6 cursor-pointer  "
            />
          </Link>
          {ReceiverChat.length > 0 ? (
            <p className=" bg-red-600  w-2 h-2  p-2  right-1   top-[-5px]  flex justify-center items-center text-xs  rounded-full  absolute  text-white">
              {ReceiverChat.length}
            </p>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default MessagesIcon;
