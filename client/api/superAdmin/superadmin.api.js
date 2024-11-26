import { getToken } from "../../utils/Cookies.js";

const baseUrl = "http://localhost:8090";
const superAdminApi = {
  getAdmins: async () => {
    try {
      let req = await fetch(`${baseUrl}/user/all-admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await req.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default superAdminApi;
