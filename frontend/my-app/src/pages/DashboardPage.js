import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import DashboardOverview from "../components/DashboardOverview";

function DashboardPage() {
  let [categories] = useState({
    "Overview": <DashboardOverview />,
    "Customers": <div>Customers content goes here.</div>,
    "Teams": <div>Teams content goes here.</div>,
    "Report": <div>Report content goes here.</div>
  });

  return (
    <div className="h-full min-h-screen bg-white text-black px-6 py-4 overflow-auto">
      <div className="text-3xl font-semibold">Dashboard</div>
      
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab key={category} className="py-2.5 px-4 text-sm leading-5 font-semibold rounded-lg">
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {Object.values(categories).map((category, idx) => (
            <Tab.Panel key={idx} className="p-4 bg-white rounded-xl shadow-md space-y-4 text-black">
              {category}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default DashboardPage;
