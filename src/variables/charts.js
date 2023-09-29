// ChartDetails.js
import React from 'react';

export const LineChartDetails = {
    chartData: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        series: [
            {
                name: 'Income $',
                data: [8790, 10222, 6000, 5000, 6000, 6540, 4560],
            },
            {
                name: 'Expenditure $',
                data: [7000, 9860, 5784, 6000, 5321, 4333, 4560],
            },
        ],
    },
    chartOptions: {
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
            categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
            labels: {
                show: true,
            },
        },
        yaxis: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        title: {
            text: 'Financial Trend Chart',
            align: 'left',
        },
        stroke: {
            curve: 'smooth',
            colors: ['#422AFB', '#21D4FD'],
        },
        markers: {
            size: 0,
        },
        legend: {
            position: 'top',
        },
    },
};

export const PieChartDetails = {
    chartData: {
        labels: ['Savings', 'Checking', 'Investments'],
        series: [20000, 10000, 5000],
    },
    chartOptions: {
        chart: {
            type: 'pie',
            height: '70vh',
        },
        labels: ['Savings', 'Checking', 'Investments'],
        legend: {
            position: 'top',
        },
        title: {
            text: 'Account Balances',
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
        colors: ['#21D4FD', '#422AFB', '#EEF0F6'],
    },
};

export const BarGraphDetails = {
    chartData: {
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
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
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
                text: 'Three Color Bar Graph',
                align: 'left',
            },
        },
        series: [
            {
                name: 'Data 1',
                data: [18127, 10222, 2300, 10000, 24182, 30000, 40000],
                color: '#21D4FD',
            },
            {
                name: 'Data 2',
                data: [5000, 7000, 3000, 8000, 10000, 12000, 15000],
                color: '#422AFB',
            },
            {
                name: 'Data 3',
                data: [5000, 7000, 3000, 8000, 10000, 12000, 15000],
                color: '#EEF0F6',
            },
        ],
    },
};
