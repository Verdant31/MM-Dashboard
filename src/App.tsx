//React Router
import { Route, BrowserRouter } from 'react-router-dom';

//React-query
import { QueryClient, QueryClientProvider } from 'react-query';

//Chakra
import { ChakraProvider } from "@chakra-ui/react"

//Styles
import { theme } from './styles/theme';

//Components
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AuthContextProvider } from './contexts/AuthContext';



function App() {
  const queryClient = new QueryClient();

  return (
    <AuthContextProvider>

      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>
    </AuthContextProvider>

  );
}

export default App;
