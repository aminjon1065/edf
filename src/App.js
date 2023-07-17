import './App.css';
import ApplicationLogo from "./components/UI/ApplicationLogo";

function App() {
    return (
        <div className={"container mx-auto"}>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <ApplicationLogo className={"w-16"}/>
        </div>
    );
}

export default App;
