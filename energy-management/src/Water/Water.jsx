import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";

function Water(){
    return(
        <div className="flex flex-row overflow-hidden h-screen">
        <VerticalNavbar />
        <div className="flex flex-col w-full overflow-y-auto">
            <HorizontalNavbar />
        </div>
    </div>
    );
}

export default Water;