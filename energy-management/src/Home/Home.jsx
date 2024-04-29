import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import Tile from './Tile';
import ChartTest from './ChartTest';
import HomePieChart from './HomePieChart';
import '../App.css';

export default function App() {
    return (
        <>
            <div className="flex flex-row overflow-hidden h-screen">
                <VerticalNavbar />
                <div className="flex flex-col w-full overflow-y-auto">
                    <HorizontalNavbar />
                    <Tile />
                    <div className='ml-4 grid grid-cols-2 gap-2 mr-4'>
                        <div className='h-[60vh] w-full bg-white rounded-lg'>
                        <ChartTest />
                        </div>
                        <HomePieChart/>
                    </div>
                </div>

            </div>

        </>
    );
}