import SkillChartPie from "./SkillChartPie";
import SkillChartBar from './SkillChartBar'
import CareerStadistics from './CareerChart'
import EmployeeCount from "./EmployeeCount"
const Home: React.FC = () => {
    return(
        <>
        <div className="employee-count charts-title">
            <EmployeeCount></EmployeeCount>
        </div>
        <h2 className="charts-title">Distribucion de empleados por habilidad</h2>
        <div className="charts-container">
            <SkillChartPie></SkillChartPie>
            <SkillChartBar></SkillChartBar>
        </div>
        <h2 className="charts-title">Distribucion de empleados por carrera</h2>
        <div className="charts-container m-bottom">
            <CareerStadistics></CareerStadistics>
        </div>
        
        </>
    )
}
export default Home;