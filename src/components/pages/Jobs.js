import React, { useState } from 'react'
import Testimonial from '../Despre/Testimonial'
import DropdownSelect from '../Joburi/DropdownSelect'
import JobService from '../../services/job.service';
import Footer from '../Footer';
import Navbar from '../Navbar';


function Jobs() {

    const [jobs, setJobs] = useState([]);

    JobService.getJobs()
        .then(response => (
            setJobs(
                response.data
            )));

    return (
        <div>
            <Navbar />
            <DropdownSelect />
            <Testimonial data={jobs} />
            <Footer />
        </div>
    )
}

export default Jobs
