import Wrapper from '../assets/wrappers/StatItem'

const StatItem = ({ count, icon, color, bcg, title }) => {
    return (
        <Wrapper color={color} bcg={bcg}>
            <header>
                <span className="icon">{icon}</span>
                <span className="count">{count}</span>
            </header>
            <h5>{title}</h5>
        </Wrapper>
    )
}

export default StatItem