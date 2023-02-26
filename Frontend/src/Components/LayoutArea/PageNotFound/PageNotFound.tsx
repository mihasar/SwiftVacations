import "./PageNotFound.css";
import image from "../../../Assets/Images/404.jpg";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={image}></img>
        </div>
    );
}

export default PageNotFound;
