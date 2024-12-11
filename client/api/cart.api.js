import { getBaseUrl } from "./config/api.config.js";
import { getToken } from "../utils/Cookies.js";
const baseUrl = getBaseUrl();
const cartApi = {
  getByUserId: async () => {
    try {
      let cart = await fetch(`${baseUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  addToCart: async (product) => {
    console.log(product);

    try {
      let cart = await fetch(`${baseUrl}/cart`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(product),
      });
      let res = await cart.json();
      console.log("res", res);

      return res;
    } catch (error) {
      console.log(error);
    }
  },
  deleteFromCart: async (productId) => {
    try {
      let cart = await fetch(`${baseUrl}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  addQty: async (productId) => {
    try {
      let cart = await fetch(`${baseUrl}/cart/add-qty/${productId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  removeQty: async (productId) => {
    try {
      let cart = await fetch(`${baseUrl}/cart/remove-qty/${productId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cartApi;
