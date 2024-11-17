import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // heroicons에서 아이콘 가져오기
import { useTheme } from "@/ThemeProvider";
import { useAuth } from "@/router/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="px-8 py-4 dark:bg-darkMode">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">
            <Link to="/">XTrading</Link>
          </h1>
          <nav className="hidden md:flex space-x-8 text-sm sm:text-base">
            <Link
              to="/interest"
              className="font-semibold text-slate-900 dark:text-white"
            >
              관심종목
            </Link>
            <Link
              to="/idea"
              className="font-semibold text-slate-900 dark:text-white"
            >
              아이디어
            </Link>
            <Link
              to="/news"
              className="font-semibold text-slate-900 dark:text-white"
            >
              뉴스
            </Link>
          </nav>
        </div>
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                className="dark:text-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="6" width="18" height="2" />
                <rect x="3" y="12" width="18" height="2" />
                <rect x="3" y="18" width="18" height="2" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate("/interest")}>
                관심종목
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/idea")}>
                아이디어
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/news")}>
                뉴스
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/mypage")}>
                마이페이지
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={toggleDarkMode}
                className="text-black dark:bg-darkMode dark:text-white"
              >
                {darkMode ? (
                  <SunIcon className="h-4 w-4" />
                ) : (
                  <MoonIcon className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden sm:flex items-center space-x-8 text-sm sm:text-base">
          {isAuthenticated ? (
            <div>
              <Link
                to="/mypage"
                className="font-semibold text-slate-900 dark:text-white mr-8"
              >
                마이페이지
              </Link>
              <span
                onClick={logout}
                className="font-semibold text-slate-900 dark:text-white cursor-pointer"
              >
                로그아웃
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-semibold text-slate-900 dark:text-white"
            >
              로그인
            </Link>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-black dark:bg-darkMode dark:text-white"
          >
            {darkMode ? (
              <SunIcon className="h-5 sm:h-6 w-5 sm:w-6" />
            ) : (
              <MoonIcon className="h-5 sm:h-6 w-5 sm:w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
