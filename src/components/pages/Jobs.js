import React, { useState, useEffect } from 'react'
import Testimonial from '../Despre/Testimonial'
import DropdownSelect from '../Joburi/DropdownSelect'
import JobService from '../../services/job.service';
import Footer from '../Footer';


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
            <DropdownSelect setFilter={setFilter} />
            <Testimonial data={jobs} filter={filter} />
            <Footer />
        </div>
    )
}

export default Jobs
