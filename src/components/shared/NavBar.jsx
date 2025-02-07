import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import laundryLogo from "../../assets/laundry-logo.svg";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActivePage = (path) =>
    location.pathname === path ? "page" : undefined;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Navbar className=" bg-white  py-5 border-b-2 border-primary">
      <NavbarMenuToggle
        // aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand className=" flex gap-2">
        <Link
          as={RouterLink}
          to="/"
          aria-current={isActivePage("/")}
          color="primary"
          className="flex gap-2"
        >
          <img src={laundryLogo} width={40} alt="Laundry Logo" />
          <p
            className="font-bold text-inherit text-2xl text-black"
            style={{
              textShadow: "1px 1px 2px rgba(46, 161, 184, 1)",
            }}
          >
            Enigma Laundry
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-7" justify="end">
        <NavbarItem isActive={location.pathname === "/produk"}>
          <Link
            as={RouterLink}
            to="/produk"
            aria-current={isActivePage("/produk")}
            color="primary"
          >
            Produk
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/customer"}>
          <Link
            as={RouterLink}
            to="/customer"
            aria-current={isActivePage("/customer")}
          >
            Customer
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/transaksi"}>
          <Link
            as={RouterLink}
            to="/transaksi"
            aria-current={isActivePage("/produk")}
          >
            Transaksi
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/register"}>
          <Link
            as={RouterLink}
            to="/register"
            aria-current={isActivePage("/register")}
          >
            Register
          </Link>
        </NavbarItem>
        <NavbarItem className=" text-primary cursor-pointer" onClick={handleLogout}>
          Logout
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className=" my-10">
        <NavbarMenuItem isActive={location.pathname === "/produk"}>
          <Link
            as={RouterLink}
            to="/produk"
            aria-current={isActivePage("/produk")}
          >
            Produk
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={location.pathname === "/customer"}>
          <Link
            as={RouterLink}
            to="/customer"
            aria-current={isActivePage("/customer")}
          >
            Customer
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={location.pathname === "/transaksi"}>
          <Link
            as={RouterLink}
            to="/transaksi"
            aria-current={isActivePage("/transaksi")}
          >
            Transaksi
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={location.pathname === "/register"}>
          <Link
            as={RouterLink}
            to="/register"
            aria-current={isActivePage("/register")}
          >
            Register
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          className=" text-primary text-md cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
