import { RouterProvider } from "react-router-dom";
// import router from "./routes/router";
import testRouter from "./routes/testRouter";

const App = () => {
    return <RouterProvider router={testRouter} />;
}

export default App;