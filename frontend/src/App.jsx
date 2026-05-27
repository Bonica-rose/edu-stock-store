import { RouterProvider } from "react-router-dom";
// import router from "./routes/router";
import router from "./routes/testRouter";

const App = () => {
    return <RouterProvider router={router} />;
}

export default App;