import "./App.css";
import { ProductProvider } from "./context/products.context";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <>
      <ProductProvider>
        <AppRouter></AppRouter>
      </ProductProvider>
    </>
  );
}

export default App;
