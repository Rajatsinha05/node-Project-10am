import productApi from "../api/product.api.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const mapper = (data) => {
  data.map(({ _id, title, price, img }) => {
    console.log(img);

    let div = document.createElement("div");
    let titleTag = document.createElement("h3");
    titleTag.innerHTML = title;
    let priceTag = document.createElement("p");
    priceTag.innerHTML = price;
    let imgTag = document.createElement("img");
    imgTag.src = `http://localhost:8090/${img}`;
    div.append(imgTag, titleTag, priceTag);
    document.getElementById("productList").append(div);
  });
};

const getProducts = async () => {
  let data = await productApi.get();
  mapper(data);
};
getProducts();
