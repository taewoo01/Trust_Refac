import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";
import { auth } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
import { onAuthStateChanged } from "firebase/auth";

// 제품 데이터 가져오기
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));
    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        product_day: data.product_day
          ? (() => {
              const productDate = data.product_day.toDate();
              const now = new Date();
              const diffInMs = now - productDate;
              const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
              return diffInDays >= 1 ? `${diffInDays}일 전` : "방금 전";
            })()
          : null,
      };
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// 사용자 데이터 가져오기
export const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "user"));
    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// 사용자 데이터 추가
export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "user"), userData); // "user" 컬렉션에 데이터 추가
    console.log("사용자 데이터 추가됨:", docRef.id);
    return docRef.id; // 추가된 문서의 ID 반환
  } catch (error) {
    console.error("사용자 데이터를 추가하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 제품 데이터 추가
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "product"), productData); // "product" 컬렉션에 데이터 추가
    console.log("제품 데이터 추가됨:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("제품 데이터를 추가하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 이미지 업로드 함수
export const uploadImageToStorage = async (file, folder = "product") => {
  try {
    const storageRef = ref(storage, `${folder}/${file.name}`); // Storage 내 경로 설정
    const snapshot = await uploadBytes(storageRef, file); // 파일 업로드
    const downloadURL = await getDownloadURL(snapshot.ref); // 다운로드 URL 가져오기
    console.log("이미지 업로드 성공:", downloadURL);
    return downloadURL; // 다운로드 URL 반환
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  }
};

// 비밀번호 업데이트
export const updatePassword = async (userID, newPassword) => {
  try {
    const userDocRef = doc(db, "user", userID); // Firestore 사용자 문서 참조
    await updateDoc(userDocRef, { password: newPassword }); // Firestore에 비밀번호 업데이트
    console.log("비밀번호가 성공적으로 업데이트되었습니다.");
  } catch (error) {
    console.error("비밀번호 업데이트 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 🔹 현재 로그인된 사용자 정보 가져오기
export const fetchCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    console.log("🔥 onAuthStateChanged 실행됨"); // ✅ 실행 로그 확인

    onAuthStateChanged(auth, async (user) => {
      console.log("🔥 현재 로그인된 사용자:", user); // ✅ 현재 로그인된 유저 정보 출력

      if (!user) {
        reject(new Error("로그인된 사용자가 없습니다."));
        return;
      }

      try {
        const userDocRef = doc(db, "user", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          resolve({ id: userDoc.id, ...userDoc.data() });
        } else {
          reject(new Error("사용자 데이터를 찾을 수 없습니다."));
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

// 🔹 특정 제품의 댓글과 대댓글 가져오기
export const fetchCommentsWithReplies = async (productID) => {
  try {
    if (!productID) {
      console.error("❌ 오류: productID가 없습니다!");
      return [];
    }

    const q = query(
      collection(db, "coment"),
      where("productID", "==", productID),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);

    // 댓글과 대댓글을 함께 가져오기
    const coments = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const comentID = doc.id;
        const replies = await fetchReplies(comentID, productID); // 대댓글 가져오기

        return {
          id: comentID,
          ...data,
          date: data.date ? formatTimeAgo(data.date.toDate()) : "날짜 없음", // 타임스탬프 변환
          replies, // 대댓글 포함
        };
      })
    );

    return coments;
  } catch (error) {
    console.error("❌ 댓글과 대댓글 가져오기 실패:", error);
    return [];
  }
};

// 🔹 대댓글 가져오기
export const fetchReplies = async (comentID, productID) => {
  try {
    const repliesRef = collection(db, "reply");
    const q = query(
      repliesRef,
      where("comentID", "==", comentID), // 🔹 특정 댓글의 대댓글 필터링
      where("productID", "==", productID), // 🔹 특정 제품의 대댓글 필터링
      orderBy("replydate", "asc") // 🔹 오래된 순으로 정렬
    );

    const querySnapshot = await getDocs(q);
    const replies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      replydate: doc.data().replydate
        ? formatTimeAgo(doc.data().replydate.toDate()) // 대댓글 날짜 처리
        : "날짜 없음",
    }));

    return replies;
  } catch (error) {
    console.error("대댓글 불러오기 오류:", error);
    return [];
  }
};

// 🔹 날짜를 "몇 일 전" 형식으로 변환하는 함수
const formatTimeAgo = (date) => {
  if (!date) return "날짜 없음"; // 방어 코드 추가

  const now = new Date();
  const diffInMs = now - date;
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSec < 60) return "방금 전";
  if (diffInMin < 60) return `${diffInMin}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  return `${diffInDays}일 전`;
};

// 🔹 Firestore에 댓글 추가하기 (user_name 사용)
export const addComment = async (productID, content) => {
  try {
    const currentUser = await fetchCurrentUser(); // 로그인한 사용자 정보 가져오기
    const newComment = {
      productID,
      author: currentUser.user_name, // 🔹 user_name을 author로 저장
      content,
      date: Timestamp.now(), // 🔹 타임스탬프 설정
      replies: [],
    };
    await addDoc(collection(db, "coment"), newComment);
    console.log("댓글 추가 성공!");
  } catch (error) {
    console.error("댓글 추가 실패:", error);
    throw error;
  }
};

// 🔹 특정 댓글에 대댓글 추가하기
export const addReply = async (commentID, replyContent) => {
  try {
    const currentUser = await fetchCurrentUser(); // 현재 로그인한 사용자 가져오기
    const commentRef = doc(db, "coment", commentID);
    const commentSnap = await getDoc(commentRef);

    if (!commentSnap.exists()) {
      throw new Error("댓글을 찾을 수 없습니다.");
    }

    const newReply = {
      author: currentUser.user_name,
      replyContent: replyContent,
      replydate: Timestamp.now(), // 🔹 현재 시간으로 타임스탬프 설정
    };

    // 🔹 대댓글 추가
    await addDoc(collection(db, "reply"), newReply);
    console.log("✅ 대댓글 추가 완료!");
  } catch (error) {
    console.error("대댓글 추가 실패:", error);
    throw error;
  }
};
