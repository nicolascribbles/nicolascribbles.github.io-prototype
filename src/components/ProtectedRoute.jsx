import { Redirect } from 'react-router-dom';
import { createAuthProvider } from 'react-token-auth';

class ProtectedRoute extends React.Component {
  render() {
    const [useAuth, authFetch, login, logout] =
      createAuthProvider<{ accessToken: String, refreshToken: String }>({
        accessTokenKey: 'accessToken',
        onUpdateToken: (token) => fetch('/update-token', {
          method: 'POST',
          body: token.refreshToken
        })
        .then(res => res.json())
      });

    const [logged] = useAuth();

    const Component = this.props.component;
    
    return logged ? ( <Component /> ) : ( <Redirect to={{ pathname: '/login' }} />);
  }
}

export default ProtectedRoute;