import { create } from "zustand";
const useMyStor = create(() => {
  const ls_strin = localStorage.getItem("auth");

  if (!ls_strin) {
    return {
      accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG50LnV6Iiwic3ViIjoyNzYsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MzU2NDI4MCwiZXhwIjoxNzQzNjUwNjgwfQ.ofclKyS-wCDhC_CnUriMFx_OngujcNRX-8PsP-21B2w",
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


