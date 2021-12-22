import AppContext from "../appContext";
import EditTimes from "../components/editTimes";
import { useContext } from "react";
function admin() {
    const value = useContext(AppContext);
    return (
        <div>
            <EditTimes games={value.games} locations={value.locations}/>
        </div>
    )
}

export default admin
