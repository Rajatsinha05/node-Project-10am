import cartApi from "../api/cart.api.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const handleQty = (id, opr) => {
  if (opr == "+") {
    cartApi.addQty(id);
  } else {
    cartApi.removeQty(id);
  }
  window.location.reload();
};

let totalPrice = 0;
const mapper = (data) => {
  data.map(({ _id, qty, product }) => {
    const { title, price, img } = product;
    totalPrice += price * qty;
    let div = document.createElement("div");
    let titleTag = document.createElement("h3");
    titleTag.innerHTML = title;
    let priceTag = document.createElement("p");
    priceTag.innerHTML = price;
    let imgTag = document.createElement("img");
    imgTag.src = `http://localhost:8090/${img}`;
    let btn1 = document.createElement("button");

    btn1.innerHTML = "-";
    btn1.addEventListener("click", () => handleQty(_id, "-"));
    let btn2 = document.createElement("button");
    btn2.innerHTML = qty;
    let btn3 = document.createElement("button");
    btn3.innerHTML = "+";
    btn3.addEventListener("click", () => handleQty(_id, "+"));
    let btnDiv = document.createElement("div");
    btnDiv.append(btn1, btn2, btn3);
    div.append(imgTag, titleTag, priceTag, btnDiv);
    document.getElementById("productList").append(div);
  });

  let amount = document.createElement("h1");
  amount.innerHTML = totalPrice;
  let btn = document.createElement("button");
  btn.innerHTML = "Pay";
  let div = document.createElement("div");

  div.append(amount, btn);
  document.getElementById("productList").append(div);
  console.log("total", totalPrice);
};

const getCartData = async () => {
  let data = await cartApi.getByUserId();
  mapper(data);
  console.log("data", data);
};

getCartData();
