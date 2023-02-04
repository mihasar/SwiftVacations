
function ParallaxScrolling(): JSX.Element {

    const tokyoImage = require("../../../Assets/Images/tokyo.jpg");

    return (
        <div className="parallax-scrolling">
            <h1 className="box">
                <img src={tokyoImage} />
            </h1>
        </div>
    )
}

export default ParallaxScrolling;