import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import { getAllJobs } from '../features/allJobs/allJobsSlice'
import Loading from './Loading'
import PageBtnContainer from './PageBtnContainer'
const JobsContainer = () => {
    const { isLoading, jobs, numOfPages, totalJobs, page, searchType, sort, search, searchStatus } = useSelector(store => store.allJobs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllJobs())
        // eslint-disable-next-line
    }, [page, searchType, sort, search, searchStatus])

    if (isLoading) {
        return (
            <Loading center />
        )
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length > 1 && 's'} found
            </h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job {...job} key={job._id} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer