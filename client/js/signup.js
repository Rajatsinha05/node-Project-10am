import userApi from "../api/user.api.js";
import getValue from "../components/input.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const handleSubmit = (e) => {
  e.preventDefault();
  let user = {
    username: getValue("#username"),
    email: getValue("#email"),
    number: getValue("#number"),
    password: getValue("#password"),
  };
  if (!user.username || !user.email || !user.password || !user.number) {
    alert("Please enter all required fields");
    return;
  }
  userApi.signup(user);
};

document.getElementById("userDetails").addEventListener("submit", handleSubmit);
