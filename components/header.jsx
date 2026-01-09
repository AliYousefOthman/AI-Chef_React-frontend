import {ChefHat, Utensils} from "lucide-react";

export default function Header(){
    return (
        <>
            <header className="header">
                <ChefHat className="icon"/>
                <h2 className="h2-header">Smart Chef</h2>
                <Utensils className="icon"/>
            </header>
        </>
    )
}