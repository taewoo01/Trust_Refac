// firebaseServices.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config"; // db를 가져옵니다.

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

    console.log("Fetched products:", products);
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
        ...data, // user 데이터 그대로 가져옵니다
      };
    });

    console.log("Fetched users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
