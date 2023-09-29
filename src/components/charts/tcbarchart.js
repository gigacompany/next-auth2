// import React, {useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import MaximizeButton from '../buttons/maximizebutton';
// import CloseButton from '../buttons/closebutton';
// import { BarGraphDetails } from '@/variables/charts';
// import { isWindowAvailable } from '@/utils/navigation';
// import dynamic from 'next/dynamic';

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const ThreeColorBarGraph = () => {
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
//              {isWindowAvailable() && isMaximized && (
//                 {/* <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-default dark:bg-black  dark:text-white z-50">
//                     <div className={`w-full md:w-3/4 lg:w-1/2 max-h-${isZoomed ? 'full' : '70vh'} overflow-y-auto`}>
//                         <div className="dark:bg-defaultdark bg-white dark:text-white rounded-3xl shadow-md p-4 relative">
//                             <div className="flex justify-end absolute top-0 right-2 z-10">
//                                 <CloseButton onClick={handleMinimizeClick} />
//                             </div>
//                             <Chart
//                                 options={BarGraphDetails.chartData.options} // Use Bar Graph Details
//                                 series={BarGraphDetails.chartData.series} // Use Bar Graph Details
//                                 type='bar'
//                                 height='100%'
//                                 width="500"
//                             />
//                         </div>
//                     </div>
//                 </div> */}
//             )}
//             <div className={`w-full shadow md:col-span-1 lg:w-full lg:h-[50vh] h-[30vh] m-auto p-4 border-none rounded-3xl dark:bg-defaultdark bg-white dark:text-white relative`}>
//                 <Chart
//                     options={BarGraphDetails.chartData.options} // Use Bar Graph Details
//                     series={BarGraphDetails.chartData.series} // Use Bar Graph Details
//                     type='bar'
//                     width='100%'
//                     height='100%'
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

// export default ThreeColorBarGraph;


import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import MaximizeButton from '../buttons/maximizebutton';
import CloseButton from '../buttons/closebutton';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ThreeColorBarGraph = () => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

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

    const [barChartData, setBarChartData] = useState({
        options: {
            chart: {
                stacked: true,
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
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10,
                    columnWidth: '15px',
                   // Adjust the width of the bars
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ['2023-08-06','2023-08-07','2023-08-08', '2023-08-09', '2023-08-10'], // Dates
                labels: {
                    show: true,
                },
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            legend: {
                position: 'top',
            },
            title: {
                text: '5 Day Bounce details',
                align: 'left',
                style:{
                    fontWeight:  'bold',
                fontSize:'18px',
                }
                
            },
        },
        series: [
            {
                name: 'Total',
                data: [0, 0, 0], // Initialize with zeros
                colors: ['#21D4FD', '#422AFB', '#EEF0F6'], // Colors for each day
            },
        ],
    });

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('http://localhost:3000/api/data')
            .then((response) => response.json())
            .then((apiData) => {
                // Initialize arrays to store counts for each day
                const totalCounts = [0, 0, 0,0,0];
                const successCounts = [0, 0, 0,0,0];
                const badmailCounts = [0, 0, 0,0,0];

                // Process API data to calculate counts for each day
                const transactions = apiData[0]?.hits?.hits || [];
                transactions.forEach((transaction) => {
                    const transactionDate = transaction._source.timeQueued.split('T')[0];

                    const index = barChartData.options.xaxis.categories.indexOf(transactionDate);

                    if (index !== -1) {
                        if (transaction._source.bounceCat === 'success') {
                            successCounts[index]++;
                        } else if (transaction._source.bounceCat === 'bad-mailbox') {
                            badmailCounts[index]++;
                        }
                        totalCounts[index]++;
                    }
                });

                // Update the series data with the counts
                setBarChartData({
                    ...barChartData,
                    series: [
                        
                        {
                            name: 'Bounced',
                            data: badmailCounts,
                            color: '#21D4FD'
                        },
                        {
                            name: 'Delivered',
                            data: successCounts,
                            color: '#422AFB'
                        },
                        {
                            name: 'Total',
                            data: totalCounts,
                            color: '#EEF0F6'
                        }, 
                    ],
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <div className={`w-full shadow md:col-span-1 lg:w-full lg:h-[50vh] h-[30vh] m-auto p-4 border-none rounded-3xl dark:bg-defaultdark bg-white dark:text-white relative`}>
                <Chart
                    options={barChartData.options}
                    series={barChartData.series}
                    type='bar'
                    width='100%'
                    height='100%'
                />
                <div className="absolute top-2 right-2 z-10 rounded-full bg-default dark:bg-black">
                    {!isMaximized && (
                        <MaximizeButton onClick={handleMaximizeClick} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThreeColorBarGraph;
