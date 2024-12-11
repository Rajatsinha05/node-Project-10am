import cartApi from "../api/cart.api.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const getCartData = async () => {
  let data = await cartApi.getByUserId();
  console.log("data", data);
};

getCartData();
