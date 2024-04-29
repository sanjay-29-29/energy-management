import { useEffect, useState } from 'react';
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";
import { supabase } from '../Database/db';

function Water() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data: totalenergy, error } = await supabase
                .from('totalenergy')
                .select('DATE');

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setUsers(totalenergy);
            }
        }

        fetchData();
    }, []);

    console.log(users);

    return (
        <div className="flex flex-row overflow-hidden h-screen">
            <VerticalNavbar />
            <div className="flex flex-col w-full overflow-y-auto">
                <HorizontalNavbar />
            </div>
        </div>
    );
}

export default Water;