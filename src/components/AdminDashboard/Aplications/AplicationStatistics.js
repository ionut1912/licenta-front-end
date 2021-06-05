import React from 'react'
import { makeStyles } from '@material-ui/core';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';


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
        padding: '10px 12px 8px 12px',
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
export default function AplicationStatistics() {
    const classes = useStyle();

    return (
        <div className={classes.statistics}>

            <div className="card mb-3" style={{ backgroundColor: '#fae5bf' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#f19e02' }}><GiIcons.GiClick /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of applications</p>
                            <p style={{ color: '#f19e02' }}>500</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#a8b5ff' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#182fb4' }}><GiIcons.GiCheckMark /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of applications checked</p>
                            <p style={{ color: '#182fb4' }}>3</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3" style={{ backgroundColor: '#fda1a1' }}>
                <div className="card-body">
                    <div className={classes.statistic}>
                        <span className={classes.statisticImg} style={{ backgroundColor: '#fa0019' }}><GoIcons.GoX /></span>
                        <div className={classes.statisticInfo}>
                            <p className="info">Number of applications to check</p>
                            <p style={{ color: '#fa0019' }}>497</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


