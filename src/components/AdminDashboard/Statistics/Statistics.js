import React, { useState, useEffect } from 'react'
import { Breadcrumbs } from '@material-ui/core';
import { motion } from "framer-motion";
import { Pie, Bar } from 'react-chartjs-2'
import jobService from '../../../services/job.service';

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import StatisticsCards from './StatisticsCards';

export default function Statistics(props) {

    const [jobPerLocation, setJobPerLocation] = useState({
        labels: [],
        data: []
    })

    // animation
    const contentAnim = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { type: 'spring', delay: 0.5, duration: 0.5 }
        }
    }

    useEffect(() => {
        jobService.getNumberOfJobsPerLocations().then(
            response => response.data.map((item) => {
                setJobPerLocation(prevInfo => {
                    return {
                        labels: [...prevInfo.labels, item.locatie],
                        data: [...prevInfo.data, item.number]
                    }
                })
            }))
    }, [setJobPerLocation])


    return (
        <motion.div variants={contentAnim} initial='hidden' animate='visible'
            className={props.sideState === true && window.innerWidth > 960 ? "dash-on dash-content" : "dash-content"}>
            <h1 style={{ padding: "10px 0 10px 0px" }} className="title-section">Statistics</h1>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <span style={{ color: '#1c2237b0' }}>Dasboard</span>
                <span className="text-primary">Statistics</span>
            </Breadcrumbs>

            <StatisticsCards style={{ marginTop: '20px' }} />

            <div style={{ display: 'flex', margin: '20px 10px 30px 10px' }}>
                <div style={{ width: '52%' }}>
                    <Bar
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                                label: 'Store 1',
                                data: [100, 200, 300, 400, 500, 600],
                                backgroundColor: 'red',
                                barThickness: 12
                            },
                            {
                                label: 'Store 2',
                                data: [321, 212, 344, 332, 223, 566],
                                backgroundColor: 'green',
                                barThickness: 12
                            },
                            {
                                label: 'Store 3',
                                data: [123, 200, 232, 400, 232, 23],
                                backgroundColor: 'orange',
                                barThickness: 12
                            },
                            {
                                label: 'Store 4',
                                data: [100, 500, 300, 343, 43, 343],
                                backgroundColor: 'purple',
                                barThickness: 12
                            },
                            ]
                        }}
                        options={{
                            tooltips: {
                                mode: 'index',
                                callbacks: {
                                    label: function (toolTipItem) {
                                        return ("Revenue: $" + toolTipItem.value)
                                    }
                                }

                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            },
                            scales: {
                                xAxes: [
                                    {
                                        gridLines: {
                                            color: 'cyan'
                                        },
                                        scaleLabel: {
                                            labelString: 'Months',
                                            display: true,
                                            fontColor: 'blue',
                                            fontSize: 20
                                        },
                                        ticks: {
                                            fontColor: 'green'
                                        }
                                    }
                                ],
                                yAxes: [
                                    {
                                        gridLines: {
                                            color: 'cyan'
                                        },
                                        scaleLabel: {
                                            labelString: 'Revenue',
                                            display: true,
                                            fontColor: 'blue',
                                            fontSize: 20,
                                        },
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: 'green',

                                        }
                                    }
                                ]
                            }
                        }}
                    >

                    </Bar>
                </div>
                <div style={{ width: '27%', marginLeft: '150px' }}>
                    <Pie
                        data={{
                            labels: jobPerLocation.labels,
                            datasets: [{
                                data: jobPerLocation.data,
                                backgroundColor: ['#f30000', '#4c0097', '#0275d8', '#12ee1d', '#f19e02']
                            }]
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }
                        }}
                    >
                    </Pie>
                </div>
            </div>
        </motion.div>
    )
}


