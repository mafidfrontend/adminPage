import { create } from "zustand";
const useMyStor = create(() => {
  const ls_strin = localStorage.getItem("auth");

  if (!ls_strin) {
    return {
      accessToken: "",
      user: null,
    };
  }
  const ls = JSON.parse(ls_strin);

  return {
    accessToken: ls.accessToken,
    user: ls.user,  
  };
});
export default useMyStor;


