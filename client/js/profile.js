import superAdminApi from "../api/superAdmin/superadmin.api.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/Cookies.js";
document.getElementById("navbar").innerHTML = navbar();

if (isSuperAdmin()) {
  let data = await superAdminApi.getAdmins();
  console.log(data);
}
else{
    console.log("No super admin");
    
}
