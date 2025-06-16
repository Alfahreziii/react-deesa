import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { getTotalPenduduk, getTotalPengurus } from "../../api/services/statisticService";

export default function EcommerceMetrics() {
  const [pendudukCount, setPendudukCount] = useState<number | null>(null);
  const [pengurusCount, setPengurusCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendudukRes, pengurusRes] = await Promise.all([
          getTotalPenduduk(),
          getTotalPengurus(),
        ]);
        setPendudukCount(pendudukRes.count);
        setPengurusCount(pengurusRes.count);
      } catch (err) {
        console.error("Gagal mengambil data statistik", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Penduduk */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Penduduk
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {pendudukCount !== null ? pendudukCount.toLocaleString() : "Loading..."}
            </h4>
          </div>
        </div>
      </div>

      {/* Pengurus */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Pengurus
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {pengurusCount !== null ? pengurusCount.toLocaleString() : "Loading..."}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
