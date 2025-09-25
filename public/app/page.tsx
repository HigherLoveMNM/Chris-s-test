"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function loadCharts() {
      const salesRes = await fetch("/api/sales/hourly");
      const payrollRes = await fetch("/api/payroll");
      const salesData = await salesRes.json();
      const payrollData = await payrollRes.json();

      const salesCtx = document.getElementById("salesChart")?.getContext("2d");
      const laborCtx = document.getElementById("laborChart")?.getContext("2d");

      // @ts-ignore
      new Chart(salesCtx, {
        type: "bar",
        data: {
          labels: salesData.map((s) => s.hour),
          datasets: [
            {
              label: "Sales ($)",
              data: salesData.map((s) => s.sales),
              backgroundColor: "#4caf50",
            },
          ],
        },
      });

      // @ts-ignore
      new Chart(laborCtx, {
        type: "pie",
        data: {
          labels: payrollData.payroll.map((p) => p.name),
          datasets: [
            {
              label: "Labor Cost",
              data: payrollData.payroll.map((p) => p.total),
              backgroundColor: ["#3f51b5", "#f44336"],
            },
          ],
        },
      });
    }
    loadCharts();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>BudWork Dashboard</h1>
      <canvas id="salesChart" height="120"></canvas>
      <canvas id="laborChart" height="120"></canvas>
    </main>
  );
}

