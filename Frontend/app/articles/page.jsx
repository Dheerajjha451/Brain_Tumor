import Navbar from "../../components/Navbar"; 
import News from "@/components/News";

export default function Dashboard() {
    return (
        <div className="flex">
            <div className="w-1/6 ">
                <Navbar />
            </div>
            <div className="w-5/6">
                <div className="p-8 mx-4">
                    <News />
                </div>
            </div>
        </div>
    );
}
