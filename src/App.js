import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewsListPage from "./pages/NewsListPage";
import NewsItemPage from "./pages/NewsItemPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<NewsListPage/>}/>
                <Route path={'/:NewsItemId'} element={<NewsItemPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
