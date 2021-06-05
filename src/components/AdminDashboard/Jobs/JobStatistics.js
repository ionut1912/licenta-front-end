import React from 'react'
import { makeStyles } from '@material-ui/core';
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'



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
        padding: '7px 10px 5px 10px',
        color: '#fff',
        fontSize:'20px',
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

export default function JobStatistics() {
    const classes = useStyle();

    return (
        <div className={classes.statistics}>

            <div className="card mb-3" style={{ backgroundColor: '#ddbefaf6' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#4c0097' }}><MdIcons.MdWork /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of jobs</p>
                            <p style={{ color: '#4c0097' }}>500</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#fda1a1' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#fa0019' }}><AiIcons.AiFillEye /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of active jobs</p>
                            <p style={{ color: '#fa0019  ' }}>3</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#a8b5ff' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#182fb4' }}><AiIcons.AiFillEyeInvisible /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of inactive jobs</p>
                            <p style={{ color: '#182fb4' }}>497</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


