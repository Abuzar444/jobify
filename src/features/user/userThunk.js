import customFetch, { checkForUnAuthorizedResponse } from '../../utils/axios'
import { clearAllJobsState } from '../allJobs/allJobsSlice'
import { logoutUser } from './userSlice'
import { clearValues } from '../job/jobSlice';

export const userRegisterThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user)
        return resp.data
    } catch (error) {
        return checkForUnAuthorizedResponse(error, thunkAPI)
    }
}

export const userLoginThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (error) {
        return checkForUnAuthorizedResponse(error, thunkAPI)
    }
}

export const userUpdateThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return resp.data

    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser())
            return checkForUnAuthorizedResponse(error, thunkAPI)
        }
        return checkForUnAuthorizedResponse(error, thunkAPI)
    }
}

export const clearStoreThunk = async (message, thunkAPI) => {
    try {
        // logout user
        thunkAPI.dispatch(logoutUser(message))
        // clear jobs value
        thunkAPI.dispatch(clearAllJobsState())
        //clear job input value
        thunkAPI.dispatch(clearValues())
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(message)
    }
}