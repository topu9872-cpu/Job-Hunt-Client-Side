import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";



export default function MainLayout({ children }) {
   
  return <>
  <NavBar/>
   <h1 className="text-6xl text-red-500">MAIN LAYOUT ACTIVE</h1>
  {children}
  <Footer/>
  </>;
}