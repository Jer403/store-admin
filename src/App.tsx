import "./App.css";
import { PaymentProvider } from "./context/payments.context";
import { ProductProvider } from "./context/products.context";
import { UserProvider } from "./context/users.context";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <>
      <ProductProvider>
        <UserProvider>
          <PaymentProvider>
            <AppRouter></AppRouter>
          </PaymentProvider>
        </UserProvider>
      </ProductProvider>
    </>
  );
}

export default App;
