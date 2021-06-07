import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import * as HiIcons from 'react-icons/hi';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md'
import userService from '../../../services/user.service'
import cvService from '../../../services/cv-service'
import aplicariiService from '../../../services/aplicareJob.serivce'
import jobService from '../../../services/job.service'

const useStyle = makeStyles(theme => ({
    statistics: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        '& .card': {
            width: '100%',
            margin: '30px 30px 0 0',
            flex: '22%%',
            maxWidth: '22%',
            [theme.breakpoints.down(1390)]: {
                flex: '21%%',
                maxWidth: '21%',
            },
            [theme.breakpoints.down(1200)]: {
                flex: '45%%',
                maxWidth: '45%',
            },
            [theme.breakpoints.down(768)]: {
                flex: '40%%',
                maxWidth: '40%',
            },
            [theme.breakpoints.down(478)]: {
                flex: '100%%',
                maxWidth: '100%',
            }
        },
        '& .card-body': {
            paddingBottom: '20px',
            [theme.breakpoints.down(1636)]: {
                paddingBottom: '5px'
            }
        }
    },
    statistic: {
        display: 'flex',
        alignItems: 'center',
    },
    statisticImg: {
        padding: '10px 12px',
        color: '#fff',
        marginRight: '15px',
        borderRadius: '50%'
    },
    statisticInfo: {
        '& p': {
            marginBottom: '5px'
        },
        '& .info': {
            fontSize: '14px',
        }
    }

}));

export default function StatisticsCards() {

    const classes = useStyle();

    const [statistics, setStatistics] = useState({
        cvs: '',
        lastWeekApps: '',
        users: '',
        activeJobs: '',
    })

    useEffect(() => {
        cvService.getNumberOfCvs().then(
            response => setStatistics(info => {
                return {
                    ...info,
                    cvs: response.data
                }
            })
        )

        aplicariiService.getNumberLastWeekApps().then(
            response => setStatistics(info => {
                return {
                    ...info,
                    lastWeekApps: response.data
                }
            })
        )

        userService.getNumberOfUsers().then(
            response => setStatistics(info => {
                return {
                    ...info,
                    users: response.data
                }
            })
        )

        jobService.getNumberOfActiveJobs().then(
            response => setStatistics(info => {
                return {
                    ...info,
                    activeJobs: response.data
                }
            })
        )



    }, [setStatistics])

    return (
        <div className={classes.statistics}>

            <div className="card mb-3" style={{ backgroundColor: '#fda1a1' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#fa0019' }}><GiIcons.GiPapers /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of all cvs</p>
                            <p style={{ color: '#fa0019' }}>{statistics.cvs}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#ddbefaf6' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#4c0097' }}><GiIcons.GiClick /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of applications from last week</p>
                            <p style={{ color: '#4c0097' }}>{statistics.lastWeekApps}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#fae5bf' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#f19e02' }}><HiIcons.HiUserGroup /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of users</p>
                            <p style={{ color: '#f19e02' }}>{statistics.users}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#a8b5ff' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#182fb4' }}><MdIcons.MdWork /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of active jobs</p>
                            <p style={{ color: '#182fb4' }}>{statistics.activeJobs}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


