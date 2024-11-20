/*eslint react/prop-types:0*/

import { useState } from "react";
import useUpdateReview from "../../../../hooks/useUpdateReviews";
import useUser from "../../../../hooks/useUser";

function Replies({ review }) {
  const [showReplies, setShowReplies] = useState(false);

  const { updateReviewId } = useUpdateReview();
  const [reply, setReply] = useState("");
  const { user } = useUser();

  const handleReplySubmit = () => {
    if (reply.trim()) {
      const newReply = {
        id: review.id,
        reply,
        name: user.user_metadata.name,
        createdAt: new Date().toISOString(),
      };

      const updatedReview = {
        ...review,
        Replies: [...(review.Replies || []), newReply],
      };

      updateReviewId(updatedReview);
      setReply("");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowReplies((e) => !e)}
        className="text-sm text-blue-600 hover:underline"
      >
        {showReplies ? "Hide Replies" : "Show Replies"}
      </button>

      {showReplies && (
        <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-300">
          {review.Replies &&
            review.Replies.map((e, i) => (
              <div
                key={i}
                className="mb-2 p-2 bg-gray-100 rounded-md shadow-sm"
              >
                <p className="text-sm font-medium text-gray-800">
                  Reply {i + 1} by{" "}
                  <span className="text-blue-600">{e.name}</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">{e.reply}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(e.createdAt).toLocaleString()}
                </p>
              </div>
            ))}

          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handleReplySubmit}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Replies;
