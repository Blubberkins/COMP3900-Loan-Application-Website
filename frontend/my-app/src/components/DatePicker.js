import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Calendar() {
  // Get the current date
  const currentDate = new Date();

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Create state variables for the selected month and year
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Create an array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Function to handle previous month button click
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Function to handle next month button click
  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the index of the first day in a month
  const getFirstDayIndex = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Create an array of day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get the number of days and the first day index for the selected month and year
  const numDays = getDaysInMonth(selectedMonth, selectedYear);
  const firstDayIndex = getFirstDayIndex(selectedMonth, selectedYear);

  return (
    <div className='calendar max-w-sm w-full shadow-lg'>
      <div className='calendar-header md:p-16 p-10 dark:bg-gray-800 bg-white rounded-t text-xl'>
        <div class='px-5 flex items-center justify-between'>
          <h2>
            {monthNames[selectedMonth]} {selectedYear}
          </h2>
          <div class='flex items-center'>
            <button
              onClick={goToPreviousMonth}
              class='focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='icon icon-tabler icon-tabler-chevron-left'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <polyline points='15 6 9 12 15 18' />
              </svg>
            </button>
            <button
              onClick={goToNextMonth}
              class='focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='icon icon-tabler  icon-tabler-chevron-right'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <polyline points='9 6 15 12 9 18' />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex items-center justify-between border-separate pt-12'>
          <table className='calendar-table w-full'>
            <thead>
              <tr>
                {dayNames.map((day) => (
                  <th key={day}>
                    <div className='w-full flex justify-center'>{day}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(Math.ceil((numDays + firstDayIndex) / 7))
                .fill(null)
                .map((_, weekIndex) => (
                  <tr key={weekIndex}>
                    {Array(7)
                      .fill(null)
                      .map((_, dayIndex) => {
                        const dayNumber =
                          weekIndex * 7 + dayIndex - firstDayIndex + 1;
                        const isCurrentMonth =
                          dayNumber >= 1 && dayNumber <= numDays;
                        return (
                            <td
                            key={dayIndex}
                            className={`text-center ${
                              !isCurrentMonth ? 'disabled' : ''
                            }`}
                          >
                            {isCurrentMonth ? (
                              <Link to={`/availableAppointments/${selectedYear}/${selectedMonth + 1}/${dayNumber}`}>
                                {dayNumber}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        );
                      })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
