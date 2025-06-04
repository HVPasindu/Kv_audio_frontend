import { Link } from "react-router-dom";

export default function Errorss(){
    return(
        <div>
            <h1>404 Erros: Page Not Found</h1>
           <Link className="bg-amber-300" to="/">Go back to Home</Link>
        </div>
    )
}