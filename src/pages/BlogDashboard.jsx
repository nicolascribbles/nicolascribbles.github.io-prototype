import { useState, useContext, createContext, useEffect } from 'react';
import BlogDataHookService from "../hooks/blogDataHook.service";

export default function BlogDashboard() {
  
  return (
    <div className="container mx-auto my-10 px-5">
      <div className="card container-sm flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-24 mx-72 rounded-lg shadow-lg sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign in
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="title" className="sr-only">Blog Title</label>
                <input id="title" name="title" type="text" autoComplete="email" required className="input first" placeholder="Blog Title" />
              </div>
              <div>
                <label htmlFor="img_url" className="sr-only">Blog Image URL</label>
                <input id="img_url" name="img_url" type="text" required className="input" placeholder="Example: http://image-url.com/image.jpg" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Blog Post Content:</label>
                <textarea id="password" name="password" type="password" required className="input last" placeholder="Password"></textarea>
              </div>
              <div>
                <label className="flex justify-start items-start">
                  <div className="bg-white border-2 rounded border-gray-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                    <input type="checkbox" className="opacity-0 absolute" />
                    <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                  <div className="select-none">Publish Now</div>
                </label>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Post Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}