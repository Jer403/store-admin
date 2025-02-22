import { createContext, useEffect, useState } from "react";
import { getAllBeneficiarysRequest } from "../api/beneficiary.ts";
import { Beneficiary, NewBeneficiary } from "../types";
import { formatDateTime } from "../utils.ts";

interface BeneficiaryContextType {
  beneficiarys: Beneficiary[] | null;
  loadingBeneficiarys: boolean;
  addBeneficiary: (newBeneficiary: NewBeneficiary) => void;
  removeBeneficiary: (id: string) => void;
  payBeneficiary: (id: string) => void;
}

interface BeneficiaryProviderProps {
  children: import("react").ReactElement;
}

export const BeneficiaryContext = createContext<BeneficiaryContextType>({
  beneficiarys: null,
  loadingBeneficiarys: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addBeneficiary: (newBeneficiary: NewBeneficiary) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeBeneficiary: (id: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payBeneficiary: (id: string) => {},
});

export function BeneficiaryProvider({ children }: BeneficiaryProviderProps) {
  const [beneficiarys, setBeneficiarys] = useState<Beneficiary[]>([]);
  const [loadingBeneficiarys, setLoadingBeneficiarys] = useState(true);

  const getBeneficiarys = async () => {
    setLoadingBeneficiarys(true);
    try {
      console.log("Starting request Beneficiarys");

      const res = await getAllBeneficiarysRequest();
      console.log("Response from Beneficiarys: ", res);
      if (res.status == 200) {
        setBeneficiarys(res.data);
      } else {
        setBeneficiarys([] as Beneficiary[]);
      }
    } catch (error) {
      console.log("Error fetching Beneficiarys data: ", error);
    } finally {
      setLoadingBeneficiarys(false);
    }
  };

  const addBeneficiary = (newBeneficiary: NewBeneficiary) => {
    const date = new Date();
    date.setHours(date.getHours() - 7);
    const BeneficiaryToAdd = {
      ...newBeneficiary,
      accumulation: 0,
      paid: 0,
      created_at: formatDateTime(date),
    } as Beneficiary;
    setBeneficiarys((prev) => {
      return [...prev, BeneficiaryToAdd];
    });
  };

  const removeBeneficiary = (id: string) => {
    setBeneficiarys((prev) => {
      return prev.filter((b) => b.id != id);
    });
  };

  const payBeneficiary = (id: string) => {
    setBeneficiarys((prev) => {
      return prev.map((b) => {
        if (b.id == id)
          return { ...b, paid: b.paid + b.accumulation, accumulation: 0 };
        return b;
      });
    });
  };

  useEffect(() => {
    getBeneficiarys();
  }, []);

  return (
    <BeneficiaryContext.Provider
      value={{
        beneficiarys,
        loadingBeneficiarys,
        addBeneficiary,
        removeBeneficiary,
        payBeneficiary,
      }}
    >
      {children}
    </BeneficiaryContext.Provider>
  );
}
