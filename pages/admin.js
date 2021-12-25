import AppContext from "../appContext";
import EditTimes from "../components/editTimes";
import { useContext } from "react";
import Templates from "../components/templates";
import Schedule from "../components/Schedule";
function admin() {
    const value = useContext(AppContext);
    return (
        <div>
            <Templates />
            {/* <EditTimes games={value.games} locations={value.locations}/> */}
        </div>
    )
}

export default admin
