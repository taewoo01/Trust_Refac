import { useState, useEffect } from "react";
import PwUpdate from "../../pages/Mypage/PwUpdate/PwUpdate";
import Modal from "./Modal";
import "./Modal";

const PwUpdateModal = () => {
  const [isPwUpdateOpen, setIsPwUpdateOpen] = useState(false);

  const openPwUpdate = () => setIsPwUpdateOpen(true);
  const closePwUpdate = () => setIsPwUpdateOpen(false);

  return (
    <>
      {/* 비밀번호 변경 버튼 */}
      <div className="dropdown-item" onClick={openPwUpdate}>
        비밀번호 변경
      </div>

      {/* 비밀번호 변경 모달 */}
      <Modal isOpen={isPwUpdateOpen} onClose={closePwUpdate}>
        <PwUpdate />
      </Modal>
    </>
  );
};

export default PwUpdateModal;
