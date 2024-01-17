import NavBar from "@/components/navbar/NavBar";
import Sidebar from "@/components/sidebar/SideBar";

export default function PanelLayout({ children }) {
  return (
    <div className="grid grid-cols-5 gap-3 h-screen">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
            <div>
                <NavBar />
            </div>
            <div>
              {children}
            </div>
        </div>      
    </div>
  )
}



