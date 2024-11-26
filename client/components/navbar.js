let { token } = Cookies.get();
console.log("token: " + token);

const decodedToken = token != undefined ? jwt_decode(token) : undefined;
const logOut = () => {
  console.log("Decoded token");

  Cookies.remove("token");
  window.location.href = "/pages/login.html";
};

const navbar = () => {
  let tag = ``;
  if (decodedToken) {
    tag = `<a class="nav-link" id=logout>Logout</a>`;
  } else {
    tag = `<a class="nav-link" href="/pages/login.html">Login</a>`;
  }
  return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/index.html">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pages/products.html">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pages/cart.html">Cart</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="/pages/profile.html">profile</a>
            </li>
            <li class="nav-item">
              ${tag}
            </li>
            <li class="nav-item">
              <a class="nav-link" ${
                decodedToken ? "" : ` href=/pages/signup.html`
              }>${decodedToken ? decodedToken.username : "Signup"}</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  `;
};

export default navbar;

document.addEventListener("DOMContentLoaded", () => {
  let logoutBtn = document.getElementById("logout");
  console.log(logoutBtn);

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logOut);
  }
});
