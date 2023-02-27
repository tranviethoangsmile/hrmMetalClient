import Sidebar from "../components/Sidebar";
import Head from "../components/Head";
import NotPage from "../components/NotFound";

function NotFound () {
    return (
        <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
          <Head />
          <NotPage/>
        </div>
      </div>
    )
}

export default NotFound;