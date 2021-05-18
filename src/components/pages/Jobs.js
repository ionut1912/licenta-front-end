import React, { useState, useEffect } from 'react'
import DropdownSelect from '../Joburi/DropdownSelect'
import JobService from '../../services/job.service';
import JobList from '../Joburi/JobList'
import Footer from '../Footer';
import FlexDinamicInfo from '../FlexDinamicInfo';
import { MakeCVInfoData } from '../Joburi/MakeCVInfoData';


function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [filter, setFilter] = useState("All");

    function loadData() {

        JobService.getJobs().then(
            response =>
                setJobs(response.data));
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <FlexDinamicInfo {...MakeCVInfoData} />
            <DropdownSelect setFilter={setFilter} />
            <JobList data={jobs} filter={filter} />
            <Footer />
        </div>
    )
}

export default Jobs
