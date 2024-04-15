import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import myImage from '../../assets/image.png';
import Water from '../../assets/ATbrrkLac.png';
import Sun from '../../assets/sun.png';
import '../App.css';

const CarouselBar = () => {
    const slides = [
        <div className="grid grid-cols-3 bg-myblack rounded-md m-2 h-full">
            <div className="col-span-3 font-roboto font-bold text-white text-4xl pl-4 pt-4 pb-4">Energy Cost</div>
            <img src={myImage} alt="My Image" className="animate-pulse row-span-2 electricity-hover" />
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >Total Cost</div>
                <div>Rs.1042424</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >This Month</div>
                <div>Rs.4213</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >This Year</div>
                <div>$0.00M</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >Total Cost</div>
                <div>$0.00M</div>
            </div>
        </div>,

        <div className="grid grid-cols-3 bg-myblack rounded-md m-2 h-full">
            <div className="col-span-3 font-roboto font-bold text-white text-4xl pl-4 pt-4 pb-4">Water Cost</div>
            <img src={Water} alt="My Image" className="animate-bounce row-span-2 water-hover" />
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >Total Cost</div>
                <div>$0.00M</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >This Month</div>
                <div>$0.00M</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >This Year</div>
                <div>$0.00M</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >Total Cost</div>
                <div>$0.00M</div>
            </div>
        </div>,

        <div className="grid grid-cols-3 bg-myblack rounded-md m-2 h-full">
            <div className="col-span-3 font-roboto font-bold text-white text-4xl pl-4 pt-4 pb-4">Solar</div>
            <img src={Sun} alt="My Image" className="animate-spin-slow row-span-2" />
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >Total Cost</div>
                <div>$0.00M</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >This Month</div>
                <div>$0.00M</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >This Year</div>
                <div>$0.00M</div>
            </div>
            <div className='px-2 text-white text-2xl font-roboto font-bold'>
                <div >Total Cost</div>
                <div>$0.00M</div>
            </div>
        </div>
    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="flex flex-col m-4">
            <div className="flex-grow">
                <Carousel responsive={responsive} infiniteLoop='true'>
                    {slides}
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselBar;