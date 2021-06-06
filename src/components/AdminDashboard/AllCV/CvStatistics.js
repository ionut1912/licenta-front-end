import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import * as GiIcons from 'react-icons/gi';
import cvService from '../../../services/cv-service'


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

export default function CvStatistics() {
    const classes = useStyle();

    const [statistics, setStatistics] = useState({
        cvs: '',
        mostUsed: ''
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

        cvService.getMostUsedSkill().then(
            response => setStatistics(info => {
                return {
                    ...info,
                    mostUsed: response.data
                }
            })
        )


    }, [setStatistics])

    return (
        <div className={classes.statistics}>

            <div className="card mb-3" style={{ backgroundColor: '#ddbefaf6' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#4c0097' }}><GiIcons.GiPapers /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of cvs</p>
                            <p style={{ color: '#4c0097' }}>{statistics.cvs}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#fda1a1' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#fa0019' }}><GiIcons.GiClick /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">The most used skills</p>
                            <p style={{ color: '#fa0019' }}>{statistics.mostUsed}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


