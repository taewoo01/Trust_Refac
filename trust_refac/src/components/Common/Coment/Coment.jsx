import "./Coment.css";
import { Form, Button, Input, message } from "antd";
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

  const [form] = Form.useForm();

  /* 답글 입력 필드 상태 */
  const [replyVisible, setReplyVisible] = useState(null); // 현재 입력 중인 댓글 ID

  /* 댓글 추가 */
  const handleCommentSubmit = (values) => {
    if (!values.comment) {
      message.error("댓글을 입력하세요!");
      return;
    }
    const newComment = {
      author: "현재 사용자",
      content: values.comment,
      date: "방금",
      replies: [],
    };
    setComments([newComment, ...comments]);
    form.resetFields();
  };

  /* 답글 추가 */
  const handleReplySubmit = (index, replyContent) => {
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
  };

  return (
    <>
      <div className="comentpage">
        <Form form={form} onFinish={handleCommentSubmit}>
          <div className="coment-list">
            <div className="comment-count">댓글 수: {comments.length}</div>
            {comments.map((comment, index) => (
              <div key={index} className="coment">
                <div className="coment-content">{comment.author} : {comment.content}</div>
                <div className="coment-day">{comment.date}</div>

                {/* 답글 리스트 */}
                {comment.replies.length > 0 && (
                  <div className="reply-list">
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="reply">
                        <div>{reply.author}: {reply.content}</div>
                        <div className="reply-day">{reply.date}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 답글 달기 버튼 */}
                <Button
                  type="link"
                  onClick={() => setReplyVisible(replyVisible === index ? null : index)}
                >
                  {replyVisible === index ? "취소" : "답글 달기"}
                </Button>

                {/* 답글 입력 필드 */}
                {replyVisible === index && (
                  <div className="reply-input">
                    <Input
                      placeholder="답글을 입력하세요"
                      onPressEnter={(e) => handleReplySubmit(index, e.target.value)}
                    />
                    <Button
                      type="primary"
                      onClick={(e) => handleReplySubmit(index, e.target.previousSibling.value)}
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
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "댓글을 입력하세요!" }]}
            >
              <Input
                className="coment-c"
                placeholder="댓글 작성~"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="coment-button"
                size="middle"
              >
                작성
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Coment;
