import { useState } from "react";
import { ProductInput } from "../components/ProductInputs/ProductInput.tsx";
import { ProductInputGallery } from "../components/ProductInputs/ProductInputGallery.tsx";
import { ProductInputImage } from "../components/ProductInputs/ProductInputImage.tsx";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createProductRequest } from "../api/products.ts";

function validateData(formData: FormData) {
  const errors = [];

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const image = formData.get("image") as File;

  if (title.length == 0) {
    errors.push("Pon un titulo al producto");
  }
  if (description.length == 0) {
    errors.push("Pon una descripción al producto");
  }
  if (price == 0) {
    errors.push("Pon un precio al producto");
  }
  if (image.name.length == 0) {
    errors.push("Selecciona una imagen principal");
  }
  return errors;
}

export function ProductAdder() {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.get("title") as string);
    formDataToSend.append("description", formData.get("description") as string);
    formDataToSend.append("price", formData.get("price") + "");
    formDataToSend.append("image", formData.get("image") as File);

    const gallery = formData.getAll("gallery") as File[];

    gallery.forEach((item) => {
      formDataToSend.append("gallery", item);
    });

    const errors = validateData(formDataToSend);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const toastId = toast.loading("Producto enviado a guardar");

    const res = await createProductRequest(formDataToSend);

    form.reset();
    setFile(null);
    setFiles(null);

    if (res.status == 200) {
      toast.success("Producto guardado", { id: toastId });
    } else {
      toast.error("Ocurrio un error", { id: toastId });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {errors ? (
          <div className="relative w-3xl bg-red-400 flex flex-col p-4 rounded-lg mt-4 items-start gap-1  outline-none ring-2 ring-offset-2 ring-red-400">
            <X
              className="absolute right-2 top-2"
              onClick={() => {
                setErrors(null);
              }}
            ></X>
            {errors.map((item, index) => {
              return (
                <span key={index * 100} className="text-2xl">
                  {item}
                </span>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <form
          action=""
          className="flex flex-col gap-4 mt-10"
          onSubmit={handleSubmit}
        >
          <ProductInput
            name="Titulo"
            identifier="title"
            type="text"
            placeholder="Titulo del producto"
          ></ProductInput>
          <ProductInput
            name="Descripción"
            identifier="description"
            type="textarea"
            placeholder="Descripcion del producto"
          ></ProductInput>
          <ProductInput
            name="Precio"
            identifier="price"
            type="number"
            placeholder="Precio del producto"
          ></ProductInput>
          <ProductInputImage
            file={file}
            setFile={setFile}
            name="Imagen Principal"
            identifier="image"
            placeholder="Imagen principal del producto"
          ></ProductInputImage>
          <ProductInputGallery
            files={files}
            setFiles={setFiles}
            name="Galeria"
            identifier="gallery"
            placeholder="Selecciona las imagenes de galeria del producto"
          ></ProductInputGallery>
          <button
            type="submit"
            className="px-4 py-2 w-44 h-14 flex flex-row items-center justify-center gap-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </form>
      </div>
    </>
  );
}
