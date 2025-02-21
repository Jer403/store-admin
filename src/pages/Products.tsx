import { CircleDashed, Edit, Trash2 } from "lucide-react";
import { IMG_API_URL } from "../consts";
import { useProduct } from "../hooks/useProduct";
import { Product } from "../types";
import "../App.css";
import { useState } from "react";
import { toast } from "sonner";
import { deleteRequest } from "../api/products";

function ProductCard({ product }: { product: Product }) {
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>(`${product.image}`);

  const handleDelete = async () => {
    setLoadingSubmit(true);

    const toastId = toast.loading("Producto enviado a eliminar");
    try {
      const res = await deleteRequest(product.id);

      if (res.status == 200) {
        toast.success("Producto eliminado", { id: toastId });
      } else {
        toast.error("Ocurrio un error", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error", { id: toastId });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="w-full flex flex-col group p-2 bg-white dark:bg-gray-80 border-2 border-gray-400 dark:border-gray-5 gap-1 rounded-lg shadow">
      <div className="flex">
        <div>
          <img
            src={`${IMG_API_URL}${currentImage}`}
            alt={product.title}
            className="h-16 w-16 sm:h-20 group-hover:h-64 group-hover:w-64  transition-[width,height]  sm:w-20 md:h-36 md:w-36 text-[8px] aspect-square object-cover rounded-md border-2 border-gray-400 dark:text-gray-5"
          />
        </div>
        <div className="w-full ml-4 flex flex-row justify-between">
          <div className="flex flex-col justify-between items-start">
            <div>
              <p className="w-full text-lg md:text-3xl flex items-start dark:text-gray-5">
                {product.title}
              </p>
              <p className="w-full text-lg md:text-2xl flex items-start dark:text-gray-5">
                {product.description}
              </p>
            </div>
            <p className="text-2xl flex items-center dark:text-gray-5">
              ${product.price}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <button
              className="w-32 h-12 px-1 flex flex-row items-center justify-center gap-1 text-sm font-medium rounded-md text-gray-50 dark:text-gray-30 border-2 border-red-400 dark:hover:bg-gray-70  hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              onClick={handleDelete}
            >
              {loadingSubmit ? (
                <CircleDashed className="h-8 w-8 loader text-red-400 dark:text-whit" />
              ) : (
                <>
                  <Trash2 className="text-red-400 h-8 w-8"></Trash2>
                  <span className="text-red-400 text-xl">Eliminar</span>
                </>
              )}
            </button>
            <button
              className="w-32 h-12 px-1 hidden flex-row items-center justify-center gap-2 text-sm font-medium rounded-md text-gray-50 dark:text-gray-30 border-2 border-blue-400 dark:hover:bg-gray-70  hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              onClick={() => {
                console.log("asd");
              }}
            >
              {loadingSubmit ? (
                <CircleDashed className="h-4 w-4 loader text-black dark:text-whit" />
              ) : (
                <>
                  <Edit className="text-blue-400 h-7 w-7"></Edit>
                  <span className="text-blue-400 text-xl">Editar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <div>
          <img
            src={`${IMG_API_URL}${product.image}`}
            alt={product.title}
            onMouseEnter={() => setCurrentImage(`${product.image}`)}
            className={`${
              currentImage == `${product.image}`
                ? "border-amber-200"
                : "border-gray-400"
            } h-[70px] w-[70px] text-[8px] aspect-square object-cover rounded-md border-2 border-gray-400 dark:text-gray-5`}
          />
        </div>
        {product.gallery?.map((image) => {
          return (
            <div>
              <img
                src={`${IMG_API_URL}${image}`}
                alt={product.title}
                onMouseEnter={() => setCurrentImage(`${image}`)}
                className={`${
                  currentImage == `${image}`
                    ? "border-amber-300"
                    : "border-gray-400"
                } h-[70px] w-[70px] text-[8px] aspect-square object-cover rounded-md border-2 dark:text-gray-5`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Products() {
  const { products, loadingProducts } = useProduct();

  return (
    <>
      <div className="w-full max-w-[1330px] min-h-lvh p-10 pb-28 mt-3 flex flex-col items-center gap-4">
        {loadingProducts ? (
          <span className="text-2xl">Cargando productos...</span>
        ) : products && products.length != 0 ? (
          <>
            {products.map((prod) => {
              return <ProductCard product={prod}></ProductCard>;
            })}
          </>
        ) : (
          <span className="text-2xl">No se encontraron productos</span>
        )}
      </div>
    </>
  );
}
