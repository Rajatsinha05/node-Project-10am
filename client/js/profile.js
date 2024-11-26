import superAdminApi from "../api/superAdmin/superadmin.api.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/Cookies.js";
document.getElementById("navbar").innerHTML = navbar();

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
    const reject = document.createElement("button");
    reject.innerHTML = "reject";
    const div = document.createElement("div");
    div.append(username, email, number, approve, reject);
    document.getElementById("adminlist").append(div);
  });
};

if (isSuperAdmin()) {
  let data = await superAdminApi.getAdmins();
  const unapprovedAdmins = data.filter((admins) => admins.isVerified == false);
  adminlist(unapprovedAdmins);
} else {
  console.log("No super admin");
}
