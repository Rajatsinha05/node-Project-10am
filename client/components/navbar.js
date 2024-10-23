let { token } = Cookies.get();

const decodedToken = token ? jwt_decode(token) : undefined;

const navbar = () => {
  let tag = ``;
  if (decodedToken) {
    tag = `<a class="nav-link" >Logout</a>`;
  } else {
    tag = `<a class="nav-link" href="/pages/login.html">
        login
      </a>`;
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
          <a class="nav-link" href="/pages/products.html">product</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pages/cart.html">cart</a>
        </li>
        <li class="nav-item">
        ${tag}
       
        </li>
        <li class="nav-item">
          <a class="nav-link" ${
            decodedToken ? "" : ` href=/pages/signup.html`
          }>${decodedToken ? decodedToken.username : "signup"}</a>
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
