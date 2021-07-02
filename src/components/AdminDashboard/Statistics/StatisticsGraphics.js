import React, { useState, useEffect } from 'react'
import { Pie, Doughnut, Line } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/core';

import jobService from '../../../services/job.service';
import aplicariiService from '../../../services/aplicareJob.serivce';


const useStyle = makeStyles(theme => ({
    charts: {
        '& .pie-charts-group': {
            display: 'flex',
            height: '100%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '70px',
            '& .second-chart': {
                width: '250px',
                [theme.breakpoints.down(1230)]: {
                    width: '200px',
                },
                [theme.breakpoints.down(875)]: {
                    width: '220px',
                },
                [theme.breakpoints.down(810)]: {
                    margin: 'auto',
                },
                [theme.breakpoints.down(500)]: {
                    width: '150px'
                },
            },
            '& .third-chart': {
                marginLeft: '300px',
                width: '250px',
                [theme.breakpoints.down(1230)]: {
                    marginLeft: '200px',
                    width: '200px',
                },
                [theme.breakpoints.down(1045)]: {
                    marginLeft: '300px',
                },
                [theme.breakpoints.down(875)]: {
                    marginLeft: '200px',
                    width: '220px',
                },
                [theme.breakpoints.down(810)]: {
                    margin: 'auto'
                },
                [theme.breakpoints.down(500)]: {
                    width: '150px'
                },
            },
            [theme.breakpoints.down(810)]: {
                flexDirection: 'column'
            },

        },
        '& .chart-title': {
            textAlign: 'center',
            margin: '30px 0 20px 0'
        },
        '& .first-chart': {
            width: '100%',
            [theme.breakpoints.down(500)]: {
                marginLeft: '-25px'
            },
        }
    }

}));


export default function StatisticsGraphics() {

    const classes = useStyle();

    const [jobPerLocation, setJobPerLocation] = useState({
        labels: [],
        data: []
    })

    const [aplicariByDay, setAplicariByDay] = useState({
        labels: [],
        data: []
    })

    const [aplicariPerJob, setAplicariPerJob] = useState({
        labels: [],
        data: []
    })

    function format(date) {
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(date));
    }


    useEffect(() => {
        jobService.getNumberOfJobsPerLocations().then(
            response => response.data.map((item) => {
                return setJobPerLocation(prevInfo => {
                    return {
                        labels: [...prevInfo.labels, item.label],
                        data: [...prevInfo.data, item.number]
                    }
                })
            }))

        jobService.getNumberOfApplicationsPerJob().then(
            response => response.data.map((item) => {
                return setAplicariPerJob(prevInfo => {
                    return {
                        labels: [...prevInfo.labels, item.label],
                        data: [...prevInfo.data, item.number]
                    }
                })
            }))

        aplicariiService.getNumberAppsFromLastMonth().then(
            response => response.data.map((item) => {
                return setAplicariByDay(prevInfo => {
                    return {
                        labels: [...prevInfo.labels, format(item.date)],
                        data: [...prevInfo.data, item.number]
                    }
                })
            })
        )

    }, [setJobPerLocation, setAplicariPerJob, setAplicariByDay])

    return (
        <div className={classes.charts}>
            <div className="first-chart">
                <h6 className="chart-title">Number of applications from last month</h6>
                <Line
                    data={{
                        labels: aplicariByDay.labels,
                        datasets: [{
                            label: 'Applications per day',
                            data: aplicariByDay.data,
                            fill: false,
                            backgroundColor: 'rgb(76, 175, 80)',
                            borderColor: 'rgb(76, 175, 80)',
                            pointRadius: 5,
                        }
                        ]
                    }}
                    options={{
                        aspectRatio: 4,
                        plugins: {
                            legend: {
                                display: false,
                            }
                        },
                        scales: {
                            y: {
                                suggestedMax: 7
                            }
                        }
                    }}>
                </Line>
            </div>


            <div className="pie-charts-group">

                <div className="second-chart">
                    <h6 className="chart-title">Number of jobs per location</h6>
                    <Doughnut
                        data={{
                            labels: jobPerLocation.labels,
                            datasets: [{
                                data: jobPerLocation.data,
                                backgroundColor: ['#f30000', '#4c0097', '#0275d8', 'rgb(76, 175, 80)', '#f19e02']
                            }]
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            }
                        }}>
                    </Doughnut>
                </div>

                <div className="third-chart">
                    <h6 className="chart-title">Number of applications per job</h6>
                    <Pie
                        data={{
                            labels: aplicariPerJob.labels,
                            datasets: [{
                                data: aplicariPerJob.data,
                                backgroundColor: ['#f30000', '#4c0097', '#0275d8', 'rgb(76, 175, 80)', '#f19e02']
                            }]
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                }
                            }
                        }}>
                    </Pie>
                </div>
            </div>
        </div>
    )
}

