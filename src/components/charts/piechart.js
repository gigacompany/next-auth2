// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import MaximizeButton from '../buttons/maximizebutton';
// import { PieChartDetails } from '@/variables/charts';
// import CloseButton from '../buttons/closebutton';
// import { isWindowAvailable } from '@/utils/navigation';
// import dynamic from 'next/dynamic';

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const PieChart = () => {
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
//         <div className="relative md:col-span-1">
//             {isWindowAvailable() && isMaximized && (
//                 <div className="fixed top-2 left-0 bottom-1 w-full h-20vh flex items-center justify-center border bg-default dark:bg-black z-50">
//                     <div className={`w-full mt-20 md:w-3/4 lg:w-[40rem] max-h-full overflow-y-auto`}>
//                         <div className="dark:bg-defaultdark bg-white dark:text-white rounded-lg shadow-md p-4 relative">
//                             <div className="flex justify-end absolute top-2 right-2 z-10">
//                                 <CloseButton onClick={handleMinimizeClick} />
//                             </div>
//                             <Chart
//                                 options={PieChartDetails.chartOptions} // Use Pie Chart Details
//                                 series={PieChartDetails.chartData.series} // Use Pie Chart Details
//                                 type="pie"
//                                 height="100%"
//                                 width="100%"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div className="w-full shadow md:w-1/5 lg:w-[40vh] lg:h-[50vh] h-1/10 md:h-auto m-auto p-4 pt-10 mr-0 rounded-3xl dark:bg-defaultdark bg-white dark:text-white relative">
//     <Chart
//         options={PieChartDetails.chartOptions} // Use Pie Chart Details
//         series={PieChartDetails.chartData.series} // Use Pie Chart Details
//         type="pie"
//         height="100%"
//         width="100%"
//     />
//     {!isMaximized && (
//         <div className="absolute top-0 right-0 z-8 rounded-full bg-default dark:bg-black">
//             <MaximizeButton onClick={handleMaximizeClick} />
//         </div>
//     )}
// </div>

//         </div>
//     );
// };

// export default PieChart;




import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import MaximizeButton from '../buttons/maximizebutton';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ThreeColorPieChart = () => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleMaximizeClick = () => {
        setIsMaximized(true);
    };

    const handleMinimizeClick = () => {
        setIsMaximized(false);
        setIsZoomed(false); // Reset zoom when minimizing
    };

    const [pieChartData, setPieChartData] = useState({
        options: {
            labels: ['Bounced', 'Delivered', 'Total'],
            colors: ['#21D4FD','#EEF0F6','#422AFB'],
            legend: {
                position: 'top',
            },
            // title: {
            //     text: 'Bounce details',
            //     align: 'top',
            //     style: {
            //         fontWeight: 'bold',
            //         fontSize: '18px',
                    
            //     },
            // },
        },
        series: [0, 0, 0], // Initialize with zeros
    });

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('http://localhost:3000/api/data')
            .then((response) => response.json())
            .then((apiData) => {
                // Initialize counts for each category
                let badmailCount = 0;
                let successCount = 0;
                let totalCount = 0;

                // Process API data to calculate counts
                const transactions = apiData[0]?.hits?.hits || [];
                transactions.forEach((transaction) => {
                    if (transaction._source.bounceCat === 'success') {
                        successCount++;
                    } else if (transaction._source.bounceCat === 'bad-mailbox') {
                        badmailCount++;
                    }
                    totalCount++;
                });

                // Update the series data with the counts
                setPieChartData({
                    ...pieChartData,
                    series: [badmailCount, successCount, totalCount],
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
          <div className="w-full shadow md:w-1/5 lg:w-[39vh] lg:h-[50vh] h-1/10 md:h-auto m-auto p-4 pt-10 mr-0 rounded-3xl dark:bg-defaultdark bg-white dark:text-white relative">
            <Chart
              options={pieChartData.options}
              series={pieChartData.series}
              type="pie" // Change chart type to 'pie'
              width="100%"
              height="100%"
            />
            
            {/* Title */}
            <div className="absolute top-2 left-2 z-10 pt-1 pl-1">
              <h2 className="text-gray-500 text-lg font-semibold text-left">Bounce details</h2>
            </div>
      
            <div className="absolute top-2 right-2 z-10 rounded-full bg-default dark:bg-black">
              {!isMaximized && (
                <MaximizeButton onClick={handleMaximizeClick} />
              )}
            </div>
          </div>
        </div>
    );
};

export default ThreeColorPieChart;
