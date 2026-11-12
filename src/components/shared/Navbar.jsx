import { User } from "lucide-react";
import { Link } from "react-router";
import Button from "./Button";

const Navbar = () => {
  return (
    <header className="bg-white py-3 px-5 mt-5 rounded-lg shadow-2xl w-180 max-w-full mx-auto">
      <div className="flex justify-between items-center">
        <Link 
        to={"/"}
        className="text-2xl font-bold"
         >Home</Link>
        <div className="flex items-center gap-4">
          <Link to={"profile"}>
            <User className="border-4 border-gray-300 hover:border-indigo-500 duration-300 rounded-full p-1 w-10 h-10" />
          </Link>
          <Link to={"login"}>
            <Button>Login</Button>
          </Link>
          <Link to={"register"}>
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
