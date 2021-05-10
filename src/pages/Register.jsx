import { useState, useContext, createContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
//import { createAuthProvider } from 'react-token-auth';

import UserDataHookService from "../hooks/userDataHook.service";

export default function Register(){
  //  const createTokenProvider = () => {
  //    
  //    let _token = 
  //      typeof window !== 'undefined'
  //      ? JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH'))
  //      : null
  //    
  //    const getExpirationDate = ( jwtToken ) => {
  //      if (!jwtToken) {
  //        return null;
  //      }
  //
  //      const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
  //
  //      // multiply by 1000 to convert seconds into milliseconds
  //      return jwt && jwt.exp && jwt.exp * 1000 || null;
  //    };
  //    
  //    const isExpired = ( exp ) => {
  //      if (!exp) {
  //        return false;
  //      }
  //
  //      return Date.now() > exp;
  //    };
  //    const getToken = async () => {
  //      if (!_token) {
  //        return null;
  //      }
  //
  //      if (isExpired(getExpirationDate(_token.accessToken))) {
  //        const updatedToken = await fetch('/update-token', {
  //          method: 'POST',
  //          body: _token.refreshToken
  //        })
  //        .then(r => r.json());
  //
  //        setToken(updatedToken);
  //      }
  //
  //      return _token && _token.accessToken;
  //    };
  //    const isLoggedIn = () => {
  //      return !!_token;
  //    };
  //
  //    
  //    let observers = [];
  //    
  //    const subscribe = (observer) => {
  //      observers.push(observer);
  //    };
  //    const unsubscribe = (observer) => {
  //      observers = observers.filter(_observer => _observer !== observer);
  //    };
  //    
  //    const notify = () => {
  //      const isLogged = isLoggedIn();
  //      observers.forEach(observer => observer(isLogged));
  //    };
  //    
  //    const setToken = (token) => {
  //      if (token) {
  //          localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
  //      } else {
  //          localStorage.removeItem('REACT_TOKEN_AUTH');
  //      }
  //      _token = token;
  //      notify();
  //    }; 
  //    return {
  //        getToken,
  //        isLoggedIn,
  //        setToken,
  //        subscribe,
  //        unsubscribe,
  //    };
  //  };
  //  
  //  const createAuthProvider = () => {
  //    const tokenProvider = createTokenProvider();
  //    
  //    const login = (newTokens) => {
  //        tokenProvider.setToken(newTokens);
  //    };
  //
  //    const logout = () => {
  //        tokenProvider.setToken(null);
  //    };
  //    const authFetch = async (input, init) => {
  //      const token = await tokenProvider.getToken();
  //
  //      init = init || {};
  //
  //      init.headers = {
  //        ...init.headers,
  //        Authorization: `Bearer ${token}`,
  //      };
  //
  //      return fetch(input, init);
  //    };
  //    const useAuth = () => {
  //      const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());
  //
  //      useEffect(() => {
  //        const listener = (newIsLogged) => {
  //            setIsLogged(newIsLogged);
  //        };
  //
  //        tokenProvider.subscribe(listener);
  //        return () => {
  //          tokenProvider.unsubscribe(listener);
  //        };
  //      }, []);
  //
  //      return [isLogged];
  //    };
  //    return {
  //        useAuth,
  //        authFetch,
  //        login,
  //        logout
  //    }
  //};
  
  const [id, setId] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  
  const [isSubmitted, setSubmission] = useState(false)
  
  //const {useAuth, authFetch, login, logout} = createAuthProvider();
  
  const onChangeUserName = (e) => {
    setUsername(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const onChangeLastName = (e) => {
    setLastName(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  
  const setData = ({ id, username, email, first_name, last_name, password }) => {
    setId(id)
    setUsername(username)
    setEmail(email)
    setFirstName(first_name)
    setLastName(last_name)
    setPassword(password)
    setSubmission(true)
  }

  //  const db = import('/app/models/index.js')
  
  //  const test_user = new db.users({
  //    username: 'nicolatestla',
  //    first_name: 'Nicola',
  //    last_name: 'Reyes',
  //    user_email: 'nicolascribbles@gmail.com',
  //    password: '123Test'
  //  }).save(test_user).then((data, res) => console.log(res.send(data)))
  
  //  console.log(UserDataHookService.create({
  //    username: 'nicolatestla',
  //    user_email: 'nicolacodes@gmail.com',
  //    first_name: 'Nicola',
  //    last_name: 'Reyes',
  //    password: 'Test123'
  //  }));
  console.log(UserDataHookService.getAll().then(res => console.log(res)))
  
  const saveUser = () => {
    
    var data = {
      username: this.state.username,
      user_email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password
    }
    
    UserDataHookService.create(data)
      .then(res => {
        setState({
          id: res.data.id,
          username: res.data.username,
          email: res.data.user_email,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          password: res.data.password });
        console.log(res.data);
      })
      .then(token => login(token))
      .catch(err => {
        console.log(err);
      });
    return (
      <Redirect to={{ pathname: '/blog-dashboard' }} />
    )
  }
  
  return(
    <div className="container mx-auto my-10 px-5">
      <div className="card container-sm flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-24 mx-72 rounded-lg shadow-lg sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Register
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="/users" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input id="username" name="username" type="text" autoComplete="username" required className="input first" placeholder="Pick a username" onChange={onChangeUserName} />
              </div>
              <div>
                <label htmlFor="user_email" className="sr-only">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required className="input" placeholder="Email address" onChange={onChangeEmail} />
              </div>
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input id="firstName" name="firstName" type="text" autoComplete="first_name" required className="input" placeholder="First name" onChange={onChangeFirstName} />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input id="lastName" name="lastName" type="text" autoComplete="last_name" required className="input" placeholder="Last name" onChange={onChangeLastName} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autooCmplete="current-password1233" required className="input last" placeholder="Password" onChange={onChangePassword} />
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={saveUser}>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}