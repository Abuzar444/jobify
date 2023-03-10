import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import { FaLocationArrow, FaCalendar, FaBriefcase } from 'react-icons/fa'
import JobInfo from './JobInfo'
import moment from 'moment/moment'
import { deleteJob, setEditJob } from '../features/job/jobSlice'

const Job = ({
    _id,
    company,
    position,
    jobLocation,
    jobType,
    createdAt,
    status,
}) => {
    const dispatch = useDispatch()
    const date = moment(createdAt).format('MMM Do, YYYY')
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <h4>more content</h4>
                    <div className={`status ${status}`}>{status}</div>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendar />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                </div>
                <footer>
                    <Link
                        to='/add-job'
                        className='btn edit-btn'
                        onClick={() => {
                            dispatch(
                                setEditJob({
                                    editJobId: _id,
                                    position,
                                    company,
                                    jobLocation,
                                    jobType,
                                    status
                                })
                            );
                        }}
                    >
                        edit
                    </Link>
                    <button
                        className='btn delete-btn'
                        type='btn'
                        onClick={() => dispatch(deleteJob(_id))}
                    >
                        delete
                    </button>
                </footer>
            </div>
        </Wrapper>
    )
}

export default Job