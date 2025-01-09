import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Firestore Timestamp -> 날짜 처리 로직
      if (data.product_day) {
        const productDate = data.product_day.toDate(); // 타임스탬프를 Date로 변환
        const now = new Date();
        const diffInMs = now - productDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        data.product_day = diffInDays >= 1 ? `${diffInDays}일 전` : "방금 전"; // 표시 형식
      }
      return data;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
