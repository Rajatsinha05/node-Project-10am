const baseUrl = "http://localhost:8090";
const userApi = {
  signup: async (user) => {
    try {
      let req = await fetch(`${baseUrl}/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let res = await req.json();
      Cookies.set("token", res.token, { expires: 1 / (24 * 60) });
      console.log(res);
    } catch (error) {
      console.log("Failed to sign up", error);
    }
  },
};

export default userApi;
