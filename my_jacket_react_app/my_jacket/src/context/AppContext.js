import { createContext, useEffect, useState } from "react";
import { findAll } from "../service/CategoryService";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [nameSearch, setNameSearch] = useState();
  const [categoryId, setCategoryId] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [categories, setCategories] = useState();
  const [nameRecommend, setNameRecommend] = useState();
  const [amountProductDetail, setAmountProductDetail] = useState();
  const [amountSelect, setAmountSelect] = useState(0);
  const [isLogin,setIsLogin] = useState(false);
  const fetchDataCategories = async () => {
    const categories = await findAll();
    setCategories(categories);
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        nameSearch,
        setNameSearch,
        categoryId,
        setCategoryId,
        isSearch,
        setIsSearch,
        categories,
        nameRecommend,
        setNameRecommend,
        amountProductDetail,
        setAmountProductDetail,
        amountSelect,
        setAmountSelect,
        isLogin,setIsLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
