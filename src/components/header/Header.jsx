import { Link, useNavigate } from "react-router-dom";
import { Container, Logo } from "../index";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const adminOrNot = useSelector((state) => state.auth.admin);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  //TODO: need to fetch from store
  const itemCount = cart && cart.cartData && cart.cartData.length;

  const navItems = [
    {
      name: "Create Category",
      slug: "/create-category",
      active: adminOrNot,
    },
    {
      name: "Create Product",
      slug: "/create-product",
      active: adminOrNot,
    },
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Orders",
      slug: "/orders",
      active: authStatus,
    },

    {
      name: "Cart",
      slug: "/cart",
      active: true,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-100">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name === "Cart" ? (
                      <>
                        {item.name}
                        {itemCount > 0 && (
                          <sup
                            className={`bg-red-600 rounded-full m-1 ${
                              itemCount > 9 ? "p-2" : "py-1 px-2"
                            } text-white`}
                          >
                            {itemCount > 9 ? "9+" : itemCount}
                          </sup>
                        )}
                      </>
                    ) : (
                      item.name
                    )}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
