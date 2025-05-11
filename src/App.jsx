import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./store/appStore";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";

function App() {
    return (
        <Provider store={appStore}>
            <Body />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Analytics />
        </Provider>
    );
}

export default App;
