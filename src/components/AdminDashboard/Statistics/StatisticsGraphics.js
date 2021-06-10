import React, { useState, useEffect } from 'react'
import { Pie, Line, Bar } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/core';

import jobService from '../../../services/job.service';
import aplicariiService from '../../../services/aplicareJob.serivce';


const useStyle = makeStyles(theme => ({
    charts: {
        '& .pie-charts-group': {
            display: 'flex',
            flexWrap: 'wrap',
            margin: '20px 10px 70px 10px',
            '& .card-title': {
                padding: '20px'
            }
        },
        '& .card': {
            margin: '30px 30px 0 0',
            heigth: '500px',
            flex: '45%',
            maxWidth: '45%',


        },
        '& .card-body': {
            margin: 'auto',
            flex: '45%',
            heigth: '500px',
            maxWidth: '45%',
            paddingBottom: '20px',
        },

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
            <div className="pie-charts-group">
                <div className="card mb-5" >
                    <h5 class="card-title">Number of jobs per location</h5>
                    <div className="card-body" >
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
                                            maxWidth: '300px',
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

                <div className="card mb-5" >
                    <h5 class="card-title">Number of applications per job</h5>
                    <div className="card-body">

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
                            }}
                        >
                        </Pie>
                    </div>
                </div>
            </div>

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
                            display: false,
                        }
                    },
                    scales: {
                        yAxes: {

                        }
                    }
                }}
            >
            </Line>
        </div>
    )
}

