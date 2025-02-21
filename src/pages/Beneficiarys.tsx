import { RadialChart } from "../components/ApexCharts/RadialChart";
import { MiniBadge } from "../components/MiniBadge";
import { createDateTextFromLanguage } from "../utils";

interface BeneficiaryInterface {
  name: string;
  ratingBeforeMax: number;
  ratingAfterMax: number;
  max: number;
  paid: number;
  accumulation: number;
  created_at: string;
}

function BeneficiaryCard({
  beneficiary,
}: {
  beneficiary: BeneficiaryInterface;
}) {
  const date = new Date();
  const maxPaidPercent =
    ((beneficiary.paid + beneficiary.accumulation) / beneficiary.max) * 100;

  return (
    <div className="w-full flex flex-col p-2 bg-white dark:bg-gray-80 border-2 shadow-md hover:shadow-lg hover:scale-[101%] transition-[scale,box-shadow] border-gray-400 dark:border-gray-5 gap-1 rounded-lg">
      <div className="flex">
        <div className="w-full mx-4 flex flex-row justify-between">
          <div className="flex flex-col justify-between items-start">
            <p className="w-full text-lg md:text-5xl flex items-start dark:text-gray-5">
              <span className="font-medium ">{beneficiary.name}</span>
            </p>
            <button
              type="submit"
              className="px-4 py-2 mb-4 w-44 h-14 flex flex-row items-center justify-center gap-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pagar ${beneficiary.accumulation}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <p className="w-full text-lg md:text-2xl flex justify-end  dark:text-gray-5">
              Desde el {createDateTextFromLanguage("es", date)}
            </p>
            <div className="flex flex-row justify-end">
              <RadialChart
                label="Premax"
                percent={beneficiary.ratingBeforeMax}
                height={150}
              ></RadialChart>
              <RadialChart
                label="Posmax"
                percent={beneficiary.ratingAfterMax}
                height={150}
              ></RadialChart>
              <RadialChart
                label="Max. pagado"
                percent={maxPaidPercent}
                height={150}
              ></RadialChart>
              <div className="flex flex-col justify-evenly ml-2">
                <MiniBadge
                  text="Total Pagado"
                  stext={`$${beneficiary.paid}`}
                ></MiniBadge>
                <MiniBadge
                  text="Máximo"
                  stext={`$${beneficiary.max}`}
                ></MiniBadge>
                <MiniBadge
                  text="Acumulado"
                  stext={`$${beneficiary.accumulation}`}
                ></MiniBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Beneficiarys() {
  return (
    <>
      <div className="w-full p-10  mt-3 max-w-[1330px] flex flex-col gap-4 items-center">
        <BeneficiaryCard
          beneficiary={{
            name: "Jose",
            ratingBeforeMax: 50,
            ratingAfterMax: 30,
            max: 500,
            paid: 23,
            accumulation: 4,
            created_at: "string",
          }}
        ></BeneficiaryCard>
      </div>
    </>
  );
}
