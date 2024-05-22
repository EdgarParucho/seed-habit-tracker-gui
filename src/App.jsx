import { useRoutes, BrowserRouter } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import TrackingForm from './components/trackingForm';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button
  className='flex mx-auto mt-10 px-2 font-medium bg-gray-200 rounded-sm text-gray-600 hover:shadow-lg hover:shadow-gray-400 transition-shadow'
  onClick={() => loginWithRedirect()}>
    Start
  </button>;
};

const HomeView = () => {
  return <div>
    <LoginButton />
  </div>
}

const DashboardView = () => {
  const { isAuthenticated } = useAuth0();
  return (isAuthenticated)
  ? <TrackingForm />
  : <LoginButton />
}

function App() {

  const AppRoutes = () => {
    const routes = useRoutes([
      {
        path: '/',
        element: <HomeView />
      },
      {
        path: '/dashboard',
        element: <DashboardView />,
      }
    ]);
    return routes;
  }

  return (
    <>
      <Auth0Provider
        domain={import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENT_ID}
        authorizationParams={{
          redirect_uri: import.meta.env.VITE_REDIRECT_URI
        }}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default App
