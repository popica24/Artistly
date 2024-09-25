import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../Contexts/AuthContext.tsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { router } from "../Routes/Router.tsx";
import Hotjar from "@hotjar/browser";

const siteId = 5104816;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
