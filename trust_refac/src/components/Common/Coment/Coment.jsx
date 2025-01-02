import "./Coment.css";
import { Button, Input, message } from "antd";
import { useState } from "react";

const Coment = () => {
  /* 댓글 리스트 */
  const [comments, setComments] = useState([
    {
      author: "양동호",
      content: "너무 갖고싶어요 !",
      date: "2024-08-15",
      replies: [], // 답글 배열
    },
    {
      author: "이율태",
      content: "레젼드 사기 물품 같은데요?",
      date: "2024-05-09",
      replies: [], // 답글 배열
    },
  ]);

  /* 답글 입력 필드 상태 */
  const [replyVisible, setReplyVisible] = useState(null); // 현재 입력 중인 댓글 ID
  const [newComment, setNewComment] = useState(""); // 댓글 입력 상태
  const [replyContent, setReplyContent] = useState(""); // 답글 입력 상태

  /* 댓글 입력 변경 처리 */
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  /* 답글 입력 변경 처리 */
  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  /* 댓글 추가 */
  const handleCommentSubmit = () => {
    if (!newComment) {
      message.error("댓글을 입력하세요!");
      return;
    }
    const newCommentObj = {
      author: "현재 사용자",
      content: newComment,
      date: "방금",
      replies: [],
    };
    setComments([newCommentObj, ...comments]);
    setNewComment(""); // 댓글 입력 필드 초기화
  };

  /* 답글 추가 */
  const handleReplySubmit = (index) => {
    if (!replyContent) {
      message.error("답글 내용을 입력하세요!");
      return;
    }
    const updatedComments = [...comments];
    updatedComments[index].replies.push({
      author: "현재 사용자",
      content: replyContent,
      date: "방금",
    });
    setComments(updatedComments);
    setReplyVisible(null); // 입력 필드 닫기
    setReplyContent(""); // 답글 입력 필드 초기화
  };

  return (
    <>
      <div className="comentpage">
        <div className="coment-list">
          <div className="comment-count">댓글 수: {comments.length}</div>
          {comments.map((comment, index) => (
            <div key={index} className="coment">
              <div className="coment-content">
                {comment.author} : {comment.content}
              </div>
              <div className="coment-day">{comment.date}</div>

              {/* 답글 리스트 */}
              {comment.replies.length > 0 && (
                <div className="reply-list">
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="reply">
                      <div>
                        {reply.author}: {reply.content}
                      </div>
                      <div className="reply-day">{reply.date}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 답글 달기 버튼 */}
              <Button
                type="link"
                onClick={() =>
                  setReplyVisible(replyVisible === index ? null : index)
                }
              >
                {replyVisible === index ? "취소" : "답글 달기"}
              </Button>

              {/* 답글 입력 필드 */}
              {replyVisible === index && (
                <div className="reply-input">
                  <Input
                    value={replyContent}
                    onChange={handleReplyChange}
                    placeholder="답글을 입력하세요"
                    onPressEnter={() => handleReplySubmit(index)}
                  />
                  <Button
                    type="primary"
                    onClick={() => handleReplySubmit(index)}
                  >
                    작성
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 댓글 작성 필드 */}
        <div className="footer">
          <Input
            value={newComment}
            onChange={handleCommentChange}
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
    </>
  );
};

export default Coment;
