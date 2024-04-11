import VerticalNavbar from './components/VerticalNavbar';
import CarouselBar from './components/CarouselBar';
import ChartTest from './components/ChartTest';
import SuggestionsBox from './components/SuggestionsBox';
import HorizontalNavbar from './components/HorizontalNavbar';
import './App.css';

export default function App() {
    return (
        <>
            <div className="flex flex-row overflow-hidden h-screen">
                <VerticalNavbar />
                <div className="flex flex-col w-full overflow-y-auto">
                    <HorizontalNavbar />
                    <CarouselBar />
                    <div className="m-6 grid grid-cols-2 grid-flow-col rounded-md m-2 h-[40vh] gap-4 ">
                        <div className="bg-myblack rounded-lg h-full">
                            <ChartTest />
                        </div>
                        <div>
                            <div className="bg-myblack text-white font-roboto font-bold h-full rounded-lg">
                                <SuggestionsBox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}