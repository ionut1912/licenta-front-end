import React, { useState, useEffect } from 'react'
import Filters from '../Joburi/Filters'
import JobService from '../../services/job.service';
import JobList from '../Joburi/JobList'
import Footer from '../Footer';
import FlexDinamicInfo from '../FlexDinamicInfo';
import { MakeCVInfoData } from '../Joburi/MakeCVInfoData';


export default function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [filter, setFilter] = useState({
        location: [],
        category: [],
        type: [],
        search: "",
    });

    function loadData() {

        JobService.getJobsActives().then(
            response =>
                setJobs(response.data));
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <FlexDinamicInfo {...MakeCVInfoData} />
            <Filters setFilter={setFilter} filter={filter} />
            <JobList data={jobs} filter={filter} />
            <Footer />
        </div>
    )
}


