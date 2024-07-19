import { Link } from "react-router-dom";
import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosClient from "../helper/axiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { selectIslogin } from "../Redux/AuthSlice";
import {logout} from "../Redux/AuthSlice"
const Header1 = () => {
  const isLogin=useSelector(selectIslogin)
  const dispatch=useDispatch()
  const handleLogout=async()=>{
    console.log("hello1")
    await axiosClient.get(`http://localhost:8090/logout/out`).then(res=>
     {
      localStorage.removeItem("userDTO")
      localStorage.removeItem("email")
      localStorage.removeItem("id")
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      dispatch(logout())
     }
    ).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="flex justify-end items-center gap-x-5 bg-violet-500 py-2 px-5">
      <button className="bg-violet-400 text-white p-2 rounded-lg hover:cursor-pointer hover:bg-violet-600">
        Logo
      </button>
      {localStorage.getItem("id")&&isLogin ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{localStorage.getItem("email")}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-violet-200 hover:cursor-pointer">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className=" hover:cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer">
                <Settings className="mr-2 h-4 w-4 hover:cursor-pointer" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem className=" hover:cursor-pointer" onClick={() => handleLogout()}>
              <LogOut className="mr-2 h-4 w-4 hover:cursor-pointer" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : localStorage.getItem("userDTO") ? (
        <div>
          <button className="bg-violet-400 text-white p-2 rounded-[100%] hover:cursor-pointer hover:bg-violet-600"></button>
          <h1>{JSON.parse(localStorage.getItem("userDTO")).email}</h1>
        </div>
      ) : (
        <div>
          <button className="bg-violet-400 text-white p-2 rounded-lg hover:cursor-pointer hover:bg-violet-600 mr-5">
            <Link to="/login">Login</Link>
          </button>
          <button className="bg-violet-400 text-white p-2 rounded-lg hover:cursor-pointer hover:bg-violet-600">
            <Link to="/register">Register</Link>
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default Header1;
