import { useCallback, useEffect, useState } from "react";
import { HorizontalChart } from "../components/ApexCharts/HorizontalBar";
import { LineChart } from "../components/ApexCharts/LineChart";
import { RadialChart } from "../components/ApexCharts/RadialChart";
import { StackedBarChart } from "../components/ApexCharts/StackedBarChart";
import { Badge } from "../components/Badge";
import { usePayment } from "../hooks/usePayment";
import { useProduct } from "../hooks/useProduct";
import { usePurchase } from "../hooks/usePurchase";
import { useUser } from "../hooks/useUser";
import { CircleDashed } from "lucide-react";
import { formatDateTime } from "../utils";

const MonthsShorted = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// type FilterType = "week" | "month" | "year" | "fullyear" | "alltime";

export function Metrics() {
  const { purchases } = usePurchase();
  const { payments } = usePayment();
  const { users } = useUser();
  const { products } = useProduct();
  const [filter, setFilter] = useState({ type: "week", aux: "" });
  const [datesByFilter, setDatesByFilter] = useState<string[]>([]);

  const [gains, setGains] = useState<number[]>([]);
  const [usersCreated, setUsersCreated] = useState<number[]>([]);

  const [totalSells, setTotalSells] = useState<number>(0);
  const [totalSellsToday, setTotalSellsToday] = useState<number>(0);

  const [totalProductSells, setTotalProductSells] = useState<number[]>([]);
  const [totalProductSellsN, setTotalProductSellsN] = useState<string[]>([]);
  const [productsSelled, setProductsSelled] = useState<
    { name: string; data: number[] }[]
  >([]);

  const getDateByFilter = () => {
    if (filter.type == "week") {
      const date = new Date();
      const data = [] as string[];
      for (let i = 0; i < 7; i++) {
        const dateActual = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - i
        );
        data.push(
          `${MonthsShorted[dateActual.getMonth()]} ${dateActual.getDate()}`
        );
      }
      return data.reverse();
    }
    if (filter.type == "month") {
      const date = new Date();
      const data = [] as string[];
      for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
        const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
        data.push(
          `${MonthsShorted[dateActual.getMonth()]} ${dateActual.getDate()}`
        );
      }
      return data;
    }
    if (filter.type == "year") {
      const data = [] as string[];
      for (let i = 0; i < 12; i++) {
        data.push(`${MonthsShorted[i]}`);
      }
      return data;
    }
    return [];
  };

  const checkDateIsCorrect = (str: string, checkDate: Date) => {
    const date = new Date(str + " UTC");
    return (
      date.getFullYear() == checkDate.getFullYear() &&
      date.getMonth() == checkDate.getMonth() &&
      date.getDate() == checkDate.getDate()
    );
  };

  const checkMonthIsCorrect = (str: string, checkDate: Date) => {
    const date = new Date(str + " UTC");
    return (
      date.getFullYear() == checkDate.getFullYear() &&
      date.getMonth() == checkDate.getMonth()
    );
  };

  const calculateGainsData = useCallback(() => {
    if (filter.type == "week") {
      if (!payments) return [] as number[];
      const date = new Date();
      const data = [] as number[];

      for (let i = 0; i < 7; i++) {
        const dateActual = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - i
        );
        const completedPayment = payments.filter(
          (pay) =>
            pay.state == "2" &&
            checkDateIsCorrect(
              formatDateTime(new Date(pay.bookingDate)),
              dateActual
            )
        );
        if (!completedPayment) return [] as number[];
        const accum = completedPayment.reduce(
          (sum, pay) => sum + Number(pay.price),
          0
        );
        data.push(accum);
      }
      return data.reverse();
    }
    if (filter.type == "month") {
      if (!payments) return [] as number[];
      const date = new Date();
      const data = [] as number[];
      for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
        const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
        const completedPayment = payments.filter(
          (pay) =>
            pay.state == "2" &&
            checkDateIsCorrect(
              formatDateTime(new Date(pay.bookingDate)),
              dateActual
            )
        );
        if (!completedPayment) return [] as number[];
        const accum = completedPayment.reduce(
          (sum, pay) => sum + Number(pay.price),
          0
        );
        data.push(accum);
      }
      return data;
    }
    if (filter.type == "year") {
      if (!payments) return [] as number[];
      const date = new Date();
      const data = [] as number[];
      for (let i = 0; i < 12; i++) {
        const dateActual = new Date(date.getFullYear(), i);
        const completedPayment = payments.filter(
          (pay) =>
            pay.state == "2" &&
            checkMonthIsCorrect(
              formatDateTime(new Date(pay.bookingDate)),
              dateActual
            )
        );
        if (!completedPayment) return [] as number[];
        const accum = completedPayment.reduce(
          (sum, pay) => sum + Number(pay.price),
          0
        );
        data.push(accum);
      }
      return data;
    }
    return [];
  }, [filter.type, payments]);

  const calculateUsersData = useCallback(() => {
    if (filter.type == "week") {
      if (!users) return [] as number[];
      const date = new Date();
      const data = [] as number[];
      for (let i = 0; i < 7; i++) {
        const dateActual = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - i
        );
        const usersInDate = users.filter((user) =>
          checkDateIsCorrect(user.created_at, dateActual)
        );
        if (!usersInDate) return [] as number[];
        const accum = usersInDate.length;
        data.push(accum);
      }
      return data.reverse();
    }
    if (filter.type == "month") {
      if (!users) return [] as number[];
      const date = new Date();
      const data = [] as number[];
      for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
        const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
        const usersInDate = users.filter((user) =>
          checkDateIsCorrect(user.created_at, dateActual)
        );
        if (!usersInDate) return [] as number[];
        const accum = usersInDate.length;
        data.push(accum);
      }
      return data;
    }
    if (filter.type == "year") {
      if (!users) return [] as number[];
      const date = new Date();
      const data = [] as number[];
      for (let i = 0; i < 12; i++) {
        const dateActual = new Date(date.getFullYear(), i);
        const usersInDate = users.filter((user) =>
          checkMonthIsCorrect(user.created_at, dateActual)
        );
        if (!usersInDate) return [] as number[];
        const accum = usersInDate.length;
        data.push(accum);
      }
      return data;
    }
    return [];
  }, [filter.type, users]);

  const calculateProductSelledData = useCallback(() => {
    if (filter.type == "week") {
      if (!purchases || !products)
        return [] as { name: string; data: number[] }[];

      const date = new Date();

      const data = [] as { name: string; data: number[] }[];

      products.forEach((prod) => {
        const pdata = [] as number[];
        for (let i = 0; i < 7; i++) {
          const dateActual = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - i
          );
          const productsInDate = purchases.filter(
            (p) =>
              checkDateIsCorrect(p.purchased_at, dateActual) &&
              p.productId == prod.id
          );

          const accum = productsInDate.length;
          pdata.push(accum);
        }
        data.push({ name: prod.title, data: pdata.reverse() });
      });
      return data.reverse();
    }
    if (filter.type == "month") {
      if (!purchases || !products)
        return [] as { name: string; data: number[] }[];

      const date = new Date();

      const data = [] as { name: string; data: number[] }[];

      products.forEach((prod) => {
        const pdata = [] as number[];
        for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
          const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
          const productsInDate = purchases.filter(
            (p) =>
              checkDateIsCorrect(p.purchased_at, dateActual) &&
              p.productId == prod.id
          );

          const accum = productsInDate.length;
          pdata.push(accum);
        }
        data.push({ name: prod.title, data: pdata });
      });
      return data;
    }
    if (filter.type == "year") {
      if (!purchases || !products)
        return [] as { name: string; data: number[] }[];

      const date = new Date();

      const data = [] as { name: string; data: number[] }[];

      products.forEach((prod) => {
        const pdata = [] as number[];
        for (let i = 0; i < 12; i++) {
          const dateActual = new Date(date.getFullYear(), i);
          const productsInDate = purchases.filter(
            (p) =>
              checkMonthIsCorrect(p.purchased_at, dateActual) &&
              p.productId == prod.id
          );

          const accum = productsInDate.length;
          pdata.push(accum);
        }
        data.push({ name: prod.title, data: pdata });
      });
      return data;
    }
    return [];
  }, [filter.type, products, purchases]);

  const calculateAllProductSellsData = useCallback(() => {
    if (!purchases || !products)
      return { data: [], prodNames: [] } as {
        data: number[];
        prodNames: string[];
      };

    const data = [] as number[];
    const prods = [] as string[];

    products.forEach((prod) => {
      const prodsFiltered = purchases.filter((p) => p.productId == prod.id);

      data.push(prodsFiltered.length);
      prods.push(prod.title);
    });
    return { data: data.reverse(), prodNames: prods };
  }, [filter.type, products, purchases]);

  const calculateTotalSells = useCallback(() => {
    if (!payments) return 0;
    const completed = payments.filter((p) => p.state == "2");
    return completed.length;
  }, [filter.type, payments]);

  const calculateTotalSellsToday = useCallback(() => {
    if (!payments) return 0;
    const completed = payments.filter(
      (p) =>
        p.state == "2" &&
        checkDateIsCorrect(formatDateTime(new Date(p.bookingDate)), new Date())
    );
    return completed.length;
  }, [filter.type, payments]);

  useEffect(() => {
    setGains(calculateGainsData());
    setUsersCreated(calculateUsersData());
    setProductsSelled(calculateProductSelledData());
    setDatesByFilter(getDateByFilter());
    const allP = calculateAllProductSellsData() as {
      data: number[];
      prodNames: string[];
    };
    setTotalProductSells(allP.data);
    setTotalProductSellsN(allP.prodNames);
    setTotalSells(calculateTotalSells());
    // console.log(gains);
    // console.log(usersCreated);
    // console.log(productsSelled);
    // console.log(datesByFilter);
    setTotalSellsToday(calculateTotalSellsToday());
  }, [products, purchases, filter]);

  return (
    <>
      <div className="w-full max-w-[1330px] p-10 mt-3 flex flex-col items-center mb-md gap-6">
        <div className="w-full flex">
          <div className="bg-white p-2 rounded-md shadow items-center justify-center">
            <select
              name="filter"
              id="filter"
              value={filter.type}
              onChange={(e) => {
                const newState = { ...filter, type: e.target.value };
                setFilter(newState);
                console.log();
                setGains([]);
                setUsersCreated([]);
                setProductsSelled([]);
                setDatesByFilter([]);
              }}
              className="focus:outline-0 px-3 py-1"
            >
              <option value="week">1 week ago</option>
              <option value="month">this month</option>
              <option value="year">this year</option>
            </select>
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center justify-center p-2 pt-4 bg-white rounded-md shadow-md">
            {gains.length > 0 && datesByFilter.length > 0 ? (
              <>
                <LineChart
                  title=""
                  dataLabels={filter.type != "month"}
                  name="Ganancia"
                  data={gains}
                  days={datesByFilter}
                ></LineChart>
              </>
            ) : (
              <>
                <div className="w-[600px] h-[410px] flex justify-center items-center text-2xl gap-4">
                  <CircleDashed className="h-10 w-10 loader"></CircleDashed>
                  <p>Analizando ganancias...</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center p-2 pt-4 bg-white rounded-md shadow-md">
            {usersCreated.length > 0 && datesByFilter.length > 0 ? (
              <>
                <LineChart
                  dataLabels={filter.type != "month"}
                  title="Usuarios creados"
                  name="Usuarios creados"
                  data={usersCreated}
                  days={datesByFilter}
                ></LineChart>
              </>
            ) : (
              <>
                <div className="w-[600px] h-[410px] flex justify-center items-center text-2xl gap-4">
                  <CircleDashed className="h-10 w-10 loader"></CircleDashed>
                  <p>Analizando usuarios creados...</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center justify-center pl-2 pr-4 pt-4 bg-white rounded-md shadow-md">
            {totalProductSells.length > 0 && totalProductSellsN.length > 0 ? (
              <>
                <HorizontalChart
                  data={totalProductSells}
                  categorys={totalProductSellsN}
                ></HorizontalChart>
              </>
            ) : (
              <>
                <div className="w-[560px] h-[410px] flex justify-center items-center text-2xl gap-4">
                  <CircleDashed className="h-10 w-10 loader"></CircleDashed>
                  <p>Analizando total de productos vendidos...</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center pl-2 pr-4 pt-4 bg-white rounded-md shadow-md">
            {productsSelled.length > 0 && datesByFilter.length > 0 ? (
              <>
                <StackedBarChart
                  days={datesByFilter}
                  data={productsSelled}
                ></StackedBarChart>
              </>
            ) : (
              <>
                <div className="w-[600px] h-[410px] flex justify-center items-center text-2xl gap-4">
                  <CircleDashed className="h-10 w-10 loader"></CircleDashed>
                  <p>Analizando productos comprados...</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center w-full justify-between">
          <div className="flex items-center bg-white rounded-md shadow-md">
            <RadialChart
              height={213}
              label="Limit Today"
              percent={30}
            ></RadialChart>
            <RadialChart
              height={213}
              label="Limit Month"
              percent={50}
            ></RadialChart>
          </div>
          <div className="flex flex-row gap-4 p-9 bg-white rounded-md shadow-md">
            <Badge title="Ventas Totales" value={totalSells}></Badge>
            <Badge
              title="Productos"
              value={products ? products.length : 0}
            ></Badge>
            <Badge title="Ventas Hoy" value={totalSellsToday}></Badge>
          </div>
        </div>
      </div>
    </>
  );
}
