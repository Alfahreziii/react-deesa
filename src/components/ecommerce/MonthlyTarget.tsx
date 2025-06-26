import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { getLaporan } from "../../api/services/laporanService"; // sesuaikan path-nya

export default function GenderComparisonChart() {
  const [jumlahLaki, setJumlahLaki] = useState(0);
  const [jumlahPerempuan, setJumlahPerempuan] = useState(0);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    { name: "Laki-laki", data: [0] },
    { name: "Perempuan", data: [0] },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const laporan = await getLaporan();
        if (laporan.length > 0) {
          const latest = laporan[laporan.length - 1];
          const total = latest.jumlah_laki + latest.jumlah_perempuan;
          const lakiPercent = total ? (latest.jumlah_laki / total) * 100 : 0;
          const perempuanPercent = total ? (latest.jumlah_perempuan / total) * 100 : 0;

          setSeries([
            { name: "Laki-laki", data: [parseFloat(lakiPercent.toFixed(2))] },
            { name: "Perempuan", data: [parseFloat(perempuanPercent.toFixed(2))] },
          ]);
          setJumlahLaki(latest.jumlah_laki);
          setJumlahPerempuan(latest.jumlah_perempuan);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#4888E9", "#F065A0"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
    xaxis: {
      categories: ["Perbandingan Gender"],
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
      max: 100,
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}%`,
        style: {
          colors: "#6B7280",
        },
      },
      max: 100,
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      labels: {
        colors: "#6B7280",
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-8 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Perbandingan Gender
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Berdasarkan laporan terakhir
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart options={options} series={series} type="bar" height={330} />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          👤 Laki-laki: <strong>{jumlahLaki}</strong> | 👩‍🦰 Perempuan:{" "}
          <strong>{jumlahPerempuan}</strong>
        </div>
      </div>
    </div>
  );
}
