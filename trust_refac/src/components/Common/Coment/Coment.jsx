import "./Coment.css";
import { Button, Input, message } from "antd";
import { useState, useEffect } from "react";
import {
  fetchCurrentUser,
  fetchCommentsWithReplies,
  addComment,
  addReply,
} from "../../../firebase/db";

const Coment = ({ productID }) => {
  const [comments, setComments] = useState([]); // 댓글 리스트 상태
  const [newComment, setNewComment] = useState(""); // 댓글 입력 상태
  const [replyText, setReplyText] = useState({}); // 각 댓글의 대댓글 입력 상태
  const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보

  // 🔹 Firestore에서 댓글과 대댓글 가져오기
  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await fetchCommentsWithReplies(productID); // 댓글과 대댓글 함께 가져오기
      setComments(fetchedComments);
    };
    loadComments();
  }, [productID]);

  // 🔹 댓글 추가 (Firestore 저장)
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      message.error("댓글을 입력하세요!");
      return;
    }

    try {
      await addComment(productID, newComment); // 대댓글 작성 시, 작성자의 이름을 자동으로 사용
      const updatedComments = await fetchCommentsWithReplies(productID);
      setComments(updatedComments);
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      message.error("댓글 추가 실패!");
    }
  };

  // 🔹 대댓글 추가 (Firestore 저장)
  const handleReplySubmit = async (commentID) => {
    if (!replyText[commentID]?.trim()) {
      message.error("답글을 입력하세요!");
      return;
    }

    try {
      await addReply(commentID, replyText[commentID]); // 대댓글 작성 시, 작성자의 이름을 자동으로 사용
      const updatedComments = await fetchCommentsWithReplies(productID);
      setComments(updatedComments);
      setReplyText((prev) => ({ ...prev, [commentID]: "" })); // 입력 필드 초기화
    } catch (error) {
      message.error("답글 추가 실패!");
    }
  };

  return (
    <div className="comentpage">
      <div className="coment-list">
        <div className="comment-count">댓글 수: {comments.length}</div>
        {comments.map((comment) => (
          <div key={comment.id} className="coment">
            <div className="coment-content">
              <strong>{comment.author}</strong> : {comment.content}
            </div>
            <div className="coment-day">{comment.date}</div>

            {/* 🔹 대댓글 목록 */}
            {comment.replies?.length > 0 && (
              <div className="reply-list">
                {comment.replies.map((reply, index) => (
                  <div key={index} className="reply">
                    <strong>{reply.author}</strong> : {reply.replyContent}
                    <div className="reply-date">{reply.replydate}</div>{" "}
                    {/* 대댓글 날짜 추가 */}
                  </div>
                ))}
              </div>
            )}

            {/* 🔹 대댓글 입력 필드 */}
            <div className="reply-input">
              <Input
                value={replyText[comment.id] || ""}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [comment.id]: e.target.value,
                  }))
                }
                placeholder="답글 작성~"
              />
              <Button
                type="primary"
                onClick={() => handleReplySubmit(comment.id)}
                size="small"
              >
                답글
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 댓글 입력 필드 */}
      <div className="footer">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글 작성~"
        />
        <Button
          type="primary"
          onClick={handleCommentSubmit}
          className="coment-button"
          size="middle"
        >
          작성
        </Button>
      </div>
    </div>
  );
};

export default Coment;
