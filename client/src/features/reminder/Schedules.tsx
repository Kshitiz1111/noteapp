import React from "react";

const Schedules = ({ schedules }: any) => {
  //create dummy schedules for now

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <ul className="divide-y divide-gray-200">
        {schedules?.map((schedule: any) => (
          <li key={schedule.title} className="py-4">
            <span className="block font-medium text-gray-900">
              {schedule.title}
            </span>
            <span className="block text-sm text-gray-500">{schedule.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedules;
