import { Fragment } from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
    return (
        <Fragment>
            <Navbar>{props.children}</Navbar>
        </Fragment>
    );
};

export default Layout;
