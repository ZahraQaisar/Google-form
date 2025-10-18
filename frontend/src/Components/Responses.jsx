import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

export default function Responses() {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch responses from backend
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const params = {};
        if (searchText) params.searchText = searchText;
        if (startDate && endDate) {
          params.startDate = startDate;
          params.endDate = endDate;
        }

        const res = await axios.get("http://localhost:5000/api/forms", { params });
        setResponses(res.data);
      } catch (error) {
        console.error("❌ Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [searchText, startDate, endDate]);

  // Generate charts data
  const totalResponses = responses.length;

  const questionTypesData = [
    { name: "shortText", value: responses.filter(r => r.formType === "Short Answer").length },
    { name: "multipleChoice", value: responses.filter(r => r.formType === "Multiple Choice").length },
    { name: "paragraph", value: responses.filter(r => r.formType === "Paragraph").length },
  ];

const questionTypesData2 = [
  { name: "Excellent", value: responses.filter(r => JSON.stringify(r.responses ?? {}).includes("Excellent")).length },
  { name: "Good", value: responses.filter(r => JSON.stringify(r.responses ?? {}).includes("Good")).length },
  { name: "Okay", value: responses.filter(r => JSON.stringify(r.responses ?? {}).includes("Okay")).length },
  { name: "Poor", value: responses.filter(r => JSON.stringify(r.responses ?? {}).includes("Poor")).length },
];


  const responsesOverTimeData = responses.map((r) => ({
    date: new Date(r.createdAt).toLocaleDateString(),
    responses: 1,
  }));

  const handlePrint = () => window.print();

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading responses...</div>;
  }

  return (
    <div className="max-w-6xl mt-6 rounded-xl mx-auto p-4 sm:p-6 bg-base-100 min-h-screen text-base-content">
      {/* Header */}
      <div className="bg-base-100 rounded-2xl shadow-sm p-6 mb-6 border border-base-300">
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-sm mb-1 text-base-content/70">Total Responses</h2>
            <div className="text-4xl font-bold">{totalResponses}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 justify-end">
            <input
              type="text"
              placeholder="Search text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-3 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content w-full sm:w-auto"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content w-1/2 sm:w-auto"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content w-1/2 sm:w-auto"
              />
            </div>
            <button
              className="px-4 py-2 bg-base-100 border border-base-300 rounded-md hover:bg-base-200 transition-colors w-full sm:w-auto text-base-content"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-6">
        {/* Question types */}
        <ChartCard title="Question Types">
          <BarChartComponent data={questionTypesData} />
        </ChartCard>

        {/* Responses over time */}
        <ChartCard title="Responses over time">
          <LineChartComponent data={responsesOverTimeData} />
        </ChartCard>

        {/* Overall Experience */}
        <ChartCard title="Overall Experience">
          <BarChartComponent data={questionTypesData2} />
        </ChartCard>
      </div>
    </div>
  );
}

// 🧩 Helper components
const ChartCard = ({ title, children }) => (
  <div className="bg-base-100 border border-base-300 rounded-lg shadow-sm p-6">
    <h3 className="text-sm mb-4 text-base-content/80">{title}</h3>
    <div className="h-64">{children}</div>
  </div>
);

const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" tick={{ fontSize: 14, fill: "currentColor" }} />
      <YAxis tick={{ fontSize: 14, fill: "currentColor" }} />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" fill="currentColor" />
    </BarChart>
  </ResponsiveContainer>
);

const LineChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" tick={{ fontSize: 12, fill: "currentColor" }} />
      <YAxis tick={{ fontSize: 12, fill: "currentColor" }} />
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey="responses" stroke="currentColor" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-200 text-base-content px-3 py-2 rounded shadow-lg text-sm">
        <div className="font-medium">{label}</div>
        <div>value : {payload[0].value}</div>
      </div>
    );
  }
  return null;
};
