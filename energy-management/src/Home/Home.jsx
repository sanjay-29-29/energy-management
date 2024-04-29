import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import CarouselBar from './CarouselBar';
import ChartTest from './ChartTest';
import SolarChart from './SolarChart';
import '../App.css';

export default function App() {
    return (
        <>
            <div className="flex flex-row overflow-hidden h-screen">
                <VerticalNavbar />
                <div className="flex flex-col w-full overflow-y-auto">
                    <HorizontalNavbar />
                    <CarouselBar />
                </div>
            </div>
        </>
    );
}