import MainLayout from "../../layouts/MainLayout";
import BinanceData from "../../components/brokers/BinanceData";

const DashboardPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="">
          <BinanceData />
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
