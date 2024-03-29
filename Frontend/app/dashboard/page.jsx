import UserInfo from "../../components/UserInfo";
import Navbar from "../../components/Navbar"; 
import HeroSection from "@/components/HeroSection";

export default function Dashboard() {
    return (
        <div>
            <div className="flex">
                <div className="w-1/6 "> 
                    <Navbar/>
                </div>
            
                <div className="w-4/5 p-8">
                    <HeroSection/>
                    <UserInfo />

                </div>
            </div>
        </div>
        
    );
}
