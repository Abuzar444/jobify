import customFetch, { checkForUnAuthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkAPI) => {
    const { searchStatus, searchType, page, sort, search } = thunkAPI.getState().allJobs
    let url = `jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if (search) {
        url = url + `&search=${search}`
    }
    try {
        const resp = await customFetch.get(url)
        return resp.data
    } catch (error) {
        return checkForUnAuthorizedResponse(error, thunkAPI)
    }
}

export const showStatsThunk = async (_, thunkAPI) => {
    try {
        const resp = await customFetch.get('/jobs/stats')
        return resp.data
    } catch (error) {
        return checkForUnAuthorizedResponse(error, thunkAPI)
    }
}