import productApi from "../../api/product.api.js";

const handleSubmit = (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let img = document.getElementById("img");
  let formdata = new FormData();
  formdata.append("title", title);
  formdata.append("price", price);
  formdata.append("description", description);
  formdata.append("img", img.files[0]);
  productApi.post(formdata);
};
document.getElementById("form").addEventListener("submit", handleSubmit);
