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
} from "firebase/firestore";
import { db } from "./config";
import { auth } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

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

// 댓글 데이터 가져오기
export const fetchComments = async (productID) => {
  try {
    const q = query(
      collection(db, "coment"),
      where("productID", "==", productID)
    );
    const querySnapshot = await getDocs(q);
    const fetchedComments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date:
          data.date instanceof Timestamp
            ? (() => {
                const comentDate = data.date.toDate();
                const now = new Date();
                const diffInMs = now - comentDate;
                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                return diffInDays >= 1 ? `${diffInDays}일 전` : "방금 전";
              })()
            : null,
        replies: data.replies || [],
      };
    });
    return fetchedComments;
  } catch (error) {
    console.error("댓글 데이터를 가져오는 중 오류가 발생했습니다:", error);
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

// 댓글 데이터 추가
export const addComment = async (commentData) => {
  try {
    const docRef = await addDoc(collection(db, "coment"), commentData); // "coment" 컬렉션에 데이터 추가
    console.log("댓글 데이터 추가됨:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("댓글 데이터를 추가하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 현재 로그인된 사용자 데이터 가져오기
export const fetchCurrentUser = async () => {
  try {
    const user = auth.currentUser; // 현재 로그인된 사용자
    if (!user) throw new Error("로그인된 사용자가 없습니다.");

    const userDocRef = doc(db, "user", user.uid); // Firestore에서 사용자 문서 참조
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      throw new Error("사용자 데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("사용자 데이터를 가져오는 중 오류가 발생했습니다:", error);
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
