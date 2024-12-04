import superAdminApi from "../api/superAdmin/superadmin.api.js";
import userApi from "../api/user.api.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/Cookies.js";
document.getElementById("navbar").innerHTML = navbar();

const handleReject = async (id) => {
  await userApi.delete(id);
  window.location.reload();
};
const handleApprove = async (id) => {
  userApi.verifyadmin(id);
  window.location.reload();
};
const adminlist = (data) => {
  data.map((ele) => {
    const username = document.createElement("h2");
    username.innerHTML = ele.username;
    const email = document.createElement("p");
    email.innerHTML = ele.email;
    const number = document.createElement("p");
    number.innerHTML = ele.number;
    const approve = document.createElement("button");
    approve.innerHTML = "approve";
    approve.addEventListener("click", () => handleApprove(ele._id));
    const reject = document.createElement("button");
    reject.innerHTML = "reject";
    reject.addEventListener("click", () => handleReject(ele._id));
    const div = document.createElement("div");
    div.append(username, email, number, approve, reject);
    document.getElementById("adminlist").append(div);
  });
};

const getAdminList = async () => {
  if (isSuperAdmin()) {
    let data = await superAdminApi.getAdmins();
    const unapprovedAdmins = data.filter(
      (admins) => admins.isVerified == false
    );
    adminlist(unapprovedAdmins);
  } else {
    console.log("No super admin");
  }
};
getAdminList();
