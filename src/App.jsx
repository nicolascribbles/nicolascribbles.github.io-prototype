import { useState, useContext, createContext, useEffect } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";

import ProtectedRoute from "/src/components/ProtectedRoute";

import useDarkMode from "/src/hooks/useDarkMode";

import UserSVG from "/src/svgs/User";
import UserCheckSVG from "/src/svgs/UserCheck";
import StarSVG from "/src/svgs/Star";
import CodeSVG from "/src/svgs/Code";
import DashboardSVG from "/src/svgs/Dashboard";
import CommentSVG from "/src/svgs/Comment";
import BookmarkSVG from "/src/svgs/Bookmark";
import StoreSVG from "/src/svgs/Store";

import MobileMenuButton from "/src/layout/MobileMenuButton";
import MobileMenu from "/src/layout/MobileMenu";
import LightLogo from "/src/layout/LightLogo";
import DarkLogo from "/src/layout/DarkLogo";
import California from "/src/layout/California";
import GithubPicture from "/src/layout/GithubPicture";

import Home from "/src/pages/Home";
import About from "/src/pages/About";
import Projects from "/src/pages/Projects";
import Contact from "/src/pages/Contact";
import Blog from "/src/pages/Blog";
import BlogDashboard from "/src/pages/BlogDashboard";
import Login from "/src/pages/Login";
import Register from "/src/pages/Register";

export default function App(){
  
  const [colorTheme, setTheme] = useDarkMode();
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch("http://api.github.com/users/nicolascribbles")
      .then(res => res.json())
      .then(data => {
        console.log(setData(data));
        console.log(data);
    });
  }, [])
  
  const setData = ({ name, login, followers, following, public_repos, avatar_url}) => {
    setName(name)
    setUsername(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
    
  }
  return (
    <div>
       <nav className="nav fixed w-full z-50">
        <div className="nav-container">
          <div className="relative flex items-center justify-between h-16">
            <MobileMenuButton />
            <div className="desktop-menu">
              <div className="menu-logo-wrapper">
               { colorTheme === "light" ?
                  <DarkLogo />
                  :
                  <LightLogo />
               }
              </div>
              <div className="desktop-menu-wrapper">
                <div className="nav-link-wrapper">

                  <NavLink to="/" exact className="nav-link" activeClassName="current">Welcome</NavLink>

                  <NavLink to="/about" className="nav-link" activeClassName="current">About Me</NavLink>
                  
                  <NavLink to="/blog" className="nav-link" activeClassName="current">Blog</NavLink>

                  <NavLink to="/login" className="nav-link" activeClassName="current">Login</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MobileMenu />
      </nav>
      <div id="main" className="pt-16 absolute w-full h-full">
        
        <div className="bg-indigo-100 z-2 shadow-lg dark:bg-gray-700 relative h-full min-h-screen md:w-50 lg:w-70 fixed">
            <div className="xl:py-2 flex flex-col justify-start">
               { colorTheme === "light" ?
                  <GithubPicture />
                  :
                  <California />
               }
                <div className="hidden xl:block text-grey-darker px-4 pb-3">
                  <div className="stats flex rounded bg-primarylight dark:bg-gray-800 mb-4 items-center justify-between w-full px-2">
                    <span className="relative flex dark:text-white" title="Followers">
                      <UserSVG className="h-4 z-2 relative dark:text-white" />
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 mr-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full text-xs z-1">{followers}</span>
                    </span>
                    <span className="relative flex dark:text-white" title="Public Repositories">
                      <CodeSVG className="h-4 z-2 relative dark:text-white" />
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full text-xs z-1">{repos}</span>
                    </span>
                    <span className="relative flex dark:text-white" title="Following">
                      <UserCheckSVG className="h-4 z-2 relative" />
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full text-xs z-1">{following}</span>
                    </span>
                  </div>
                  <h1 className="font-mono uppercase font-bold text-lg">
                    {name}
                  </h1>
                  <p className="text-xs py-2">
                    I am a full stack software engineer currently working for <strong className="text-primarylight">Intrinio, Inc.</strong> As a Software Engineer, I am responsible for implementing visual elements for our web products and applications. I combine the art of design with the science of programming providing the hemispheric synchronization bridge between the two departments.I am responsible for the translation of UI/UX design wireframes to production-ready code.
                  </p>
                </div>
                <div className="hidden xl:block uppercase font-bold text-grey-darker text-xs px-4 py-2">
                  Main
                </div>
                <div className="group relative sidebar-item with-children">
                  <NavLink to="/projects" className="block xl:flex xl:items-center text-center xl:text-left shadow-light xl:shadow-none py-6 xl:py-2 xl:px-4 border-l-4 border-transparent hover:bg-primarylight dark:hover:bg-indigo-400" activeClassName="bg-primarylight dark:bg-indigo-400">
                    <DashboardSVG />
                    <div className="text-black font-bold dark:text-white text-xs">View Github Projects</div>
                  </NavLink>
                </div>
                <div className="group relative sidebar-item with-children">
                  <NavLink to="/contact" className="block xl:flex xl:items-center text-center xl:text-left shadow-light xl:shadow-none py-6 xl:py-2 xl:px-4 border-l-4 border-transparent hover:bg-primarylight dark:hover:bg-black" activeClassName="bg-primarylight dark:bg-indigo-400">
                    <CommentSVG />
                    <div className="text-black font-bold dark:text-white text-xs">Contact Me</div>
                  </NavLink>
                </div>
              </div>


              <div className="py-4">
                <div className="hidden xl:block uppercase font-bold text-grey-darker text-xs px-4 py-2">
                  Controls
                </div>
                
                <div className="flex items-center justify-start px-4 mt-3">
                  <label htmlFor="checkbox" className="flex items-center cursor-pointer text-xs">
                    <div className="relative mr-3">
                      <input
                        type="checkbox"
                        id="checkbox"
                        name="checkbox"
                        className="sr-only"
                        checked={colorTheme === "light" ? true : false}
                        onChange={() => setTheme(colorTheme)} />
                      <div className="block bg-gray-600 w-8 h-5 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition"></div>
                    </div>
                    {colorTheme === "light" ? "Dark" : "Light"} Mode
                  </label>
                </div>
              </div>
            </div>
        <div className="bg-indigo-200 z-0 dark:bg-gray-600 pt-8 overflow-auto pb-24" style={{maxHeight: '92.5vh'}}>
          
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog" component={Blog} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/blog-dashboard" component={BlogDashboard} />
            <Route exact={true} path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  )
}