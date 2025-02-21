import "./App.css";
import { ChatProvider } from "./context/chat.context";
import { PaymentProvider } from "./context/payments.context";
import { ProductProvider } from "./context/products.context";
import { PurchasesProvider } from "./context/purchases.context";
import { UserProvider } from "./context/users.context";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <>
      <PurchasesProvider>
        <ChatProvider>
          <ProductProvider>
            <UserProvider>
              <PaymentProvider>
                <AppRouter></AppRouter>
              </PaymentProvider>
            </UserProvider>
          </ProductProvider>
        </ChatProvider>
      </PurchasesProvider>
    </>
  );
}

export default App;
