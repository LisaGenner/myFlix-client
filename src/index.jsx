import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";


// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";


//commented out this code to see if i can get movie cards to show in local host
// Main component (will eventually use all the others)
// const MyFlixApplication = () => {
//     return (
//         <div className="my-flix">
//             <div>Good morning</div>
//         </div>
//     );
// };

const App = () => {
    return (<Container>
        <MainView />
    </Container>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);