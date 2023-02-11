import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { toast } from 'react-toastify'
import { FormRowSelect, FormRow } from '../../components'
import { clearValues, createJob, editJob, handleChange } from '../../features/job/jobSlice'
import { useEffect } from 'react'

const AddJob = () => {
    const dispatch = useDispatch()
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId,
    } = useSelector((store) => store.job)
    const { user } = useSelector(store => store.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!position || !company || !jobLocation) {
            toast.error('Please fill all the fields')
            return
        }
        if (isEditing) {
            dispatch(
                editJob({
                    jobId: editJobId,
                    job: {
                        position,
                        company,
                        jobLocation,
                        jobType,
                        status,
                    }
                })
            )
            return
        }
        dispatch(createJob({ position, company, jobLocation, jobType, status }))
    }

    const handleJobChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(handleChange({ name, value }))
    }

    useEffect(() => {
        if (!isEditing) {
            dispatch(handleChange({ name: 'jobLocation', value: user.location }));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>{isEditing ? 'edit Job' : 'Add job'}</h3>

                <div className="form-center">


                    {/* position */}
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobChange}
                    />

                    {/* company */}
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobChange}
                    />

                    {/* jobLocation */}
                    <FormRow
                        type='text'
                        name='jobLocation'
                        labelText='job Location'
                        value={jobLocation}
                        handleChange={handleJobChange}
                    />
                    {/* status */}

                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={handleJobChange}
                        list={statusOptions}
                    />

                    {/* Job Location */}
                    <FormRowSelect
                        name="jobType"
                        value={jobType}
                        labelText='job Type'
                        handleChange={handleJobChange}
                        list={jobTypeOptions}
                    />

                    <div className="btn-container">
                        {/* clear btn */}
                        <button
                            type='button'
                            className='btn btn-block clear-btn'
                            onClick={() => dispatch(clearValues())}
                        >
                            clear
                        </button>

                        {/* submit btn */}
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            disabled={isLoading}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob