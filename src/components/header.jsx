import React, { useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { IoIosArrowUp } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { loginContext } from "./../context/context";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [scroll, setScroll] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [cat, setCat] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState('');
  const login = useContext(loginContext)

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('role')
    login.setLogin(false)
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    window.addEventListener("scroll", handleScroll);

    console.log(login.login)
    setUrl(location.pathname);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/category/`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setCat(res.data.content);
      });
  }, [])

  React.useEffect(() => {
    if(localStorage.getItem('authToken')){
      setIsLogin(true)
    }
    console.log(login.login)
  }, [login.login])

  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = cat.map((cats, key) => (
      <a href={`/cat/${cats.id}`} key={key}>
        <MenuItem className="rounded-lg text-center">
            <Typography
              variant="h6"
              color="blue-gray"
              className=" text-sm font-bold"
            >
              {cats.name}
            </Typography>
        </MenuItem>
      </a>
    ));

    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" className="font-normal">
              <ListItem
                className="flex items-center justify-center gap-2 py-2 pr-4 font-normal text-gray-900"
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                Categories
                <IoIosArrowUp
                  className={`hidden h-4 w-4 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <IoIosArrowUp
                  className={`block h-4 w-4 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
            <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
        </div>
      </React.Fragment>
    );
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-5">
      <a href="/" className="flex items-center">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`py-1 px-3 rounded-md mx-auto font-normal text-md hover:bg-bt hover:bg-blue-gray-50 ${
            url === "/"
              ? "bg-bt text-bt-tx drop-shadow-lg hover:bg-bt hover:text-bt-tx"
              : ""
          }`}
        >
          Home
        </Typography>
      </a>
      <NavListMenu />
      <a href="/about" className="flex items-center">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`py-1 px-3 rounded-md mx-auto font-normal text-md hover:bg-bt  hover:bg-blue-gray-50 ${
            url === "/about"
              ? "bg-bt text-bt-tx drop-shadow-lg hover:bg-bt hover:text-bt-tx"
              : ""
          }`}
        >
          About
        </Typography>
      </a>
      <a href="/contact" className="flex items-center">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`py-1 px-3 rounded-md mx-auto font-normal text-md hover:bg-bt  hover:bg-blue-gray-50 ${
            url === "/contact"
              ? "bg-bt text-bt-tx drop-shadow-lg hover:bg-bt hover:text-bt-tx"
              : ""
          }`}
        >
          Contact Us
        </Typography>
      </a>
      <button
        className="px-3 hidden lg:flex xl:flex"
        onClick={handleSearch}
      >
        <IoSearchSharp className="h-5 w-5" />
      </button>
      {isLogin && (
        <a href="/login" className="flex items-center" onClick={handleLogout}>
          <Typography
            as="li"
            className={`py-1 px-3 rounded-md mx-auto font-normal text-md tx-bt-tx hover:bg-bt  hover:bg-gray-900/10`}
          >
            Logout
          </Typography>
        </a>
      )}
    </ul>
  );

  function NavList() {
    return (
      <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        {navList}
      </List>
    );
  }

  return (
    <div className="max-h-[768px] max-w-screen">
      <Navbar
        className={`fixed top-0 z-10 h-max max-w-full px-4 py-1 lg:px-8 rounded-none transition duration-300 ease-in border-none bg-opacity-100 bg-bt-tx ${
          scroll ? "scroll" : ""
        }`}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <a href="/" className=" mr-4 cursor-pointer justify-start">
            <img src="/logo.png" className="object-contain h-14 xl:h-16 2xl:h-16 lg:h-16 sm:h-14 " />
          </a>
          <div className="hidden lg:block">
            <NavList />
          </div>
          {/* <div className="hidden gap-2 lg:flex">
            <Button variant="text" size="sm" color="blue-gray">
              Log In
            </Button>
            <Button variant="gradient" size="sm">
              Sign In
            </Button>
          </div> */}
          <div className="flex flex-cols">
            <button
              className="lg:hidden xl:hidden px-3 lg:flex xl:flex"
              onClick={handleSearch}
            >
              <IoSearchSharp className="h-5 w-5" />
            </button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <FaXmark className="h-6 w-6 text-black/70" />
              ) : (
                <FaBars className="h-6 w-6 text-black/70" />
              )}
            </IconButton>
            {!isLogin && (
              <div className="flex items-center gap-x-1">
                <a
                  href="/login"
                  className={`px-4 py-2 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-gray-50 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block ${
                    url === "/login" ? "bg-bt text-bt-tx drop-shadow-lg hover:bg-bt hover:text-bt-tx" : ""
                  }`}
                  type="button"
                >
                  <span>sigh in</span>
                </a>
                <a
                  href="/register"
                  className={`px-4 py-2 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-gray-50 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block ${
                    url === "/register" ? "bg-bt text-bt-tx drop-shadow-lg hover:bg-bt hover:text-bt-tx" : ""
                  }`}
                  type="button"
                >
                  <span>Sign up</span>
                </a>
              </div>
            )}
          </div>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
      <div className={`fixed h-screen inset-0 bg-black/60 z-40 flex items-center justify-center overflow-y-auto transition ease-in duration-300 ${openSearch ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <p className="absolute top-5 right-10" onClick={handleSearch}><FaXmark className="h-10 w-10 text-bt-tx cursor-pointer" /></p>
            <div className={`bg-main rounded-lg shadow-lg w-full max-w-md p-6 transition ease-in duration-300 ${openSearch ? 'translate-y-0' : '-translate-y-3'}`}>
              <h2 className="text-2xl font-bold mb-4">Search</h2>
              <div className="flex items-center space-x-2">
              <input
                id="name"
                placeholder="Search item..."
                value={searchVal}
                className="block w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-sm md:text-sm lg:text-md"
                onChange={(e)=> setSearchVal(e.target.value)}
                type="text"
              />
                 <button
              onClick={()=> window.location.href = `/search/${searchVal}`}
              className="bg-bt text-bt-tx px-5 py-2 rounded-lg"
            >
              <IoSearchSharp className="h-5 w-5" />
            </button>
              </div>
            </div>
          </div>
    </div>
  );
}
