import { useState, useEffect } from "react"
import { FormRow, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}
const Register = () => {
    const [values, setValues] = useState(initialState)
    const { isLoading, user } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            toast.error('please fill all the value')
            return
        }
        if (isMember) {
            dispatch(loginUser({ email, password }))
            return
        }
        dispatch(registerUser({ name, email, password }))
    }

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [user, navigate])

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={handleSubmit}>
                <Logo />
                <h3>{!values.isMember ? 'Register' : 'login'}</h3>
                {/* name field */}
                {!values.isMember && <FormRow
                    name='name'
                    value={values.name}
                    type='text'
                    handleChange={handleChange}
                    lebelText='name'
                />}

                {/* email field */}
                <FormRow
                    name='email'
                    value={values.email}
                    type='text'
                    handleChange={handleChange}
                    lebelText='email'
                />

                {/* password field */}
                <FormRow
                    name='password'
                    value={values.password}
                    type='password'
                    handleChange={handleChange}
                    lebelText='password'
                />

                <button
                    type="submit"
                    className="btn btn-block"
                    disabled={isLoading}>
                    {isLoading ? 'loading...' : 'submit'}
                </button>
                <button
                    type="button"
                    className="btn btn-block btn-hipster"
                    disabled={isLoading}
                    onClick={() => dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))}
                >
                    {isLoading ? 'loading...' : 'demo app'}
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'already a member?'}
                    <button onClick={toggleMember} className='member-btn' type="button">{values.isMember ? 'Register' : 'Login'}</button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register