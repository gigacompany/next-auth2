// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// import MaximizeButton from '../buttons/maximizebutton';
// import CloseButton from '../buttons/closebutton';
// import { LineChartDetails } from '@/variables/charts';
// import { isWindowAvailable } from '@/utils/navigation'; // Import isWindowAvailable
// import dynamic from 'next/dynamic';

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const CurvyLineChart = () => {
//     const [isMaximized, setIsMaximized] = useState(false);
//     const [isZoomed, setIsZoomed] = useState(false);
   

//     const handleMaximizeClick = () => {
//         setIsMaximized(true);
//     };

//     const handleMinimizeClick = () => {
//         setIsMaximized(false);
//         setIsZoomed(false); // Reset zoom when minimizing
//     };

//     const handleZoomClick = () => {
//         setIsZoomed(!isZoomed);
//     };


//     return (
//         <div>
//             {isWindowAvailable() && isMaximized && ( // Check if window is available
//                 <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-default dark:bg-black z-50">
//                     <div className={`w-full md:w-3/4 lg:w-1/2 max-h-${isZoomed ? 'full' : '70vh'} overflow-y-auto`}>
//                         <div className="dark:bg-defaultdark bg-white dark:text-white rounded-3xl shadow-md p-4 relative">
//                             <div className="flex justify-end absolute top-0 right-2 z-10">
//                                 <CloseButton onClick={handleMinimizeClick} />
//                             </div>
//                             <Chart
//                                 options={LineChartDetails.chartOptions} // Use Line Chart Details
//                                 series={LineChartDetails.chartData.series} // Use Line Chart Details
//                                 type="line"
//                                 height={isZoomed ? '100%' : '70vh'}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div className={`w-full md:col-span-1 lg:w-full lg:h-[50vh] h-[30vh] m-auto p-4 border-none rounded-3xl dark:bg-defaultdark bg-white dark:text-white relative`}>
//                 <Chart
//                     options={LineChartDetails.chartOptions} // Use Line Chart Details
//                     series={LineChartDetails.chartData.series} // Use Line Chart Details
//                     type="line"
//                     width="100%"
//                     height="100%"
//                 />
//                 <div className="absolute top-2 right-2 z-10">
//                     {!isMaximized && (
//                         <MaximizeButton onClick={handleMaximizeClick} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CurvyLineChart;


import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import MaximizeButton from '../buttons/maximizebutton';
import { MdOutlineCalendarMonth } from 'react-icons/md';

const CurvyLineChart = () => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const months = [
        'This Month',
        'Last 2 Months',
        'Last 6 Months',
        'Last 1 Year',
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
      const selectMonth = (index) => {
        setSelectedMonth(index);
        setIsDropdownOpen(false);
      };

    const handleMaximizeClick = () => {
        setIsMaximized(true);
    };

    const handleMinimizeClick = () => {
        setIsMaximized(false);
        setIsZoomed(false); // Reset zoom when minimizing
    };

    const handleZoomClick = () => {
        setIsZoomed(!isZoomed);
    };
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);
    const [totalSuccessCount, setTotalSuccessCount] = useState(0); // Define totalSuccessCount
    const [totalBadMailboxCount, setTotalBadMailboxCount] = useState(0); // Define totalBadMailboxCount

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('http://localhost:3000/api/data')
            .then((response) => response.json())
            .then((apiData) => {
                // Extract relevant data from the API response
                const transactions = apiData[0]?.hits?.hits || [];

                // Filter transactions within the specified time period (3 days)
                const startDate = new Date('2023-08-06');
                const endDate = new Date('2023-08-11'); // Data includes transactions up to 2023-08-10
                const filteredTransactions = transactions.filter((transaction) => {
                    const transactionDate = new Date(transaction._index);
                    return transactionDate >= startDate && transactionDate < endDate;
                });

                // Create data arrays for success and bad-mailbox counts on each date
                // const dates = ['..........2023-08-06','2023-08-07','2023-08-08', '2023-08-09', '2023-08-10'];
                const dates = ['...........2023-08-08', '2023-08-09', '2023-08-10'];
                const successCounts = Array(dates.length).fill(0);
                const badMailboxCounts = Array(dates.length).fill(0);

                // Populate the counts based on transaction data
                filteredTransactions.forEach((transaction) => {
                    const transactionDate = new Date(transaction._source.timeQueued).toISOString().split('T')[0];
                    const index = dates.indexOf(transactionDate);
                    if (transaction._source.bounceCat === 'success') {
                        successCounts[index]++;
                    } else if (transaction._source.bounceCat === 'bad-mailbox') {
                        badMailboxCounts[index]++;
                    }
                });

                // Calculate the totals for each bounce category
                const totalSuccess = successCounts.reduce((acc, count) => acc + count, 0);
                const totalBadMailbox = badMailboxCounts.reduce((acc, count) => acc + count, 0);

                // Set the total counts in state variables
                setTotalSuccessCount(totalSuccess);
                setTotalBadMailboxCount(totalBadMailbox);

    
                // Set chart options
                const options = {
                    chart: {
                        id: 'line-chart',
                        type: 'line',
                        height: '70vh',
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    grid: {
                        show: false,
                        xaxis: {
                            lines: {
                                show: false,
                            },
                        },
                        yaxis: {
                            lines: {
                                show: false,
                            },
                        },
                    },
                    xaxis: {
                        type: 'category',
                        categories: dates,
                        title: {
                          text: 'Dates',
                        },
                        
                        labels: {
                          style: {
                            fontSize: '12px', // Adjust the font size as needed
                            fontWeight: 'bold', // Adjust the font weight as needed
                            color: '#purple',
                            firstchild:{
                                marginleft:'10px',
                            } // Change to the desired color (e.g., purple)
                          },
                        },
                        axisTicks: {
                            show: false, // Hide axis ticks
                          },
                      },
                    yaxis: {
                        show: false, // Set show to false to hide the y-axis
                    },
                    series: {
                        curve: 'smooth', // Use 'smooth' to make lines curved
                    },
                    stroke: {
                        curve: 'smooth',
                        colors: ['#4ade80', '#f53939'], // Success and Bad-Mailbox colors
                    },
                    // title: {
                    //     text: 'BounceCat Counts',
                    //     align: 'left',
                    // },
                    toolbar: {
                        show: false,
                    },
                };
                

                // Set chart series data
                const series = [
                    {
                        name: 'Delivered',
                        data: successCounts,
                        color: "#4ade80"
                    },
                    {
                        name: 'Bounced',
                        data: badMailboxCounts,
                        color:"#f53939"
                    },
                ];

                setChartOptions(options);
                setChartSeries(series);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
   
    return (
        <div className="relative shadow rounded-3xl">
        <div className="absolute top-0 left-0 p-5 text-xl font-bold text-graydark z-10">
        <button className='border-black flex items-center bg-gray rounded-lg p-2 text-base' onClick={toggleDropdown}>
  <MdOutlineCalendarMonth size={20} style={{ marginRight: '2px' }} />
  {isDropdownOpen ? 'Close' : 'August'}
</button>

            <p className="mt-[20px] text-2xl font-bold text-purple dark:text-white text-center">
              {totalSuccessCount + totalBadMailboxCount}
            </p>
            <div className="mt-2 text-sm text-gray-600 text-center">Total count</div>
          </div>
      
          <div className="w-full md:col-span-1 lg:w-full lg:h-[50vh] h-[90rem] m-auto pl-[6rem] pt-0 border-none rounded-3xl dark:bg-defaultdark bg-white dark:text-white relative">
            {/* Your existing chart with ApexCharts */}
            <ApexCharts options={chartOptions} series={chartSeries} type="line" height="100%" width="100%" className="toolbar-hidden" />
            {!isMaximized && (
              <div className="absolute top-2 right-2 z-10 rounded-full bg-default dark:bg-black">
                <MaximizeButton onClick={handleMaximizeClick} />
              </div>
            )}
          </div>
      
          {isDropdownOpen && (
            <div className="absolute top-8 left-0 p-2 bg-white dark:bg-defaultdark border mr-[40vh] rounded-lg shadow z-20">
              {/* <button
                className="border-black bg-gray  rounded-lg p-1 text-base text-black" // Added w-full to make buttons full width
                onClick={() => selectMonth(new Date().getMonth())}
              >
              </button> */}
              {months.map((month, index) => (
                index !== selectMonth && (
                  <button
                    key={month}
                    className="bg-gray rounded-lg p-2 pr-6 pl-6 mb-2 w-full hover:bg-purple hover:text-white text-black" // Added w-full to make buttons full width
                    onClick={() => selectMonth(index)}
                  >
                    {month}
                  </button>
                )
              ))}
            </div>
          )}
      
          {/* Second "This Month" section */}
          <div className="absolute top-[17vh] left-0 pl-9 text-xl font-bold text-graydark z-10 ">
            <p className="mt-[20px] text-3xl font-bold text-success dark:text-white text-center">{totalSuccessCount}</p>
            <div className="mt-2 text-sm text-gray-600 text-center">Delivered</div>
          </div>
      
          {/* Third "This Month" section */}
          <div className="absolute top-[25vh] left-0 pl-10 pt-4 text-xl font-bold text-graydark z-10 ">
            <p className="mt-[20px] text-3xl font-bold text-danger dark:text-white text-center">{totalBadMailboxCount}</p>
            <div className="mt-2 text-sm text-gray-600 text-center">Bounced</div>
          </div>
        </div>
      );
      
    };
export default CurvyLineChart;