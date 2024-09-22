import InputColor from "../components/inputs/InputColor";
import TableIndex from "../components/tables/TableIndex";
import TableTest from "../components/tables/TableTest";

const Dashboard = () => {
    return (
        <>
            <h1>Đây là trang Dashboard</h1>
            <InputColor
                title='Username'
                type='text'
                placeholder="matkhau"
            />
            {/* <TableIndex /> */}
            <TableTest />
        </>
    )
}

export default Dashboard;