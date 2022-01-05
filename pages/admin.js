import AppContext from "../appContext";
import { useContext } from "react";
import Templates from "../components/templates";
function admin() {
    const value = useContext(AppContext);
    return (
        <div>
            <Templates />
        </div>
    )
}

export default admin
