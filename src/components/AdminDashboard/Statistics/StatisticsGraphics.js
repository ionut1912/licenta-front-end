import React, { useState, useEffect } from 'react'
import { Pie, Line } from 'react-chartjs-2'

import jobService from '../../../services/job.service';
import aplicariiService from '../../../services/aplicareJob.serivce';

export default function StatisticsGraphics() {

    const [jobPerLocation, setJobPerLocation] = useState({
        labels: [],
        data: []
    })

    const [aplicariByDay, setAplicariByDay] = useState({
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
                        labels: [...prevInfo.labels, item.locatie],
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

    }, [setJobPerLocation, setAplicariByDay])

    return (
        <div style={{ display: 'flex', margin: '20px 10px 70px 10px' }}>
            <div style={{ width: '52%' }}>
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
                        plugins: {
                            legend: {
                                display: true,
                                position: "bottom",
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            }
                        },
                        scales: {
                            yAxes: {
                                tricks: {
                                    min: aplicariByDay.data[0],
                                    max: aplicariByDay.data[6],
                                    stepSize: 1.0,
                                }
                            }
                        }
                    }}
                >

                </Line>
            </div>
            <div style={{ width: '30%', marginLeft: '150px' }}>
                <Pie
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
                                display: true,
                                position: "bottom",
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            },


                        }
                    }}
                >
                </Pie>
            </div>
        </div>
    )
}

