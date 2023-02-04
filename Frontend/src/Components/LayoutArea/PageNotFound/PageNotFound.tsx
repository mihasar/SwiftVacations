import "./PageNotFound.css";
// import image from "../../../Assets/Images/404.gif"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <p>The page you are looking for doesn't exist.😔</p>

            <iframe width="350" height="220" src="https://www.youtube.com/embed/t3otBjVZzT0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

            {/* <img src={image}></img> */}

        </div>
    );
}

export default PageNotFound;
