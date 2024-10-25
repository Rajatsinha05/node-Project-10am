import navbar from "../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();

let { isVerified } = Cookies.get();
console.log(isVerified);

if (isVerified.toString() == "false") {
  document.getElementById(
    "alert"
  ).innerHTML = `<div class="alert alert-warning" role="alert">
      verify your email address 
      </div>`;
}
