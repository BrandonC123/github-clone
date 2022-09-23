const NotFound = () => {
    return (
        <div>
            <img
                style={{ height: "45vh", width: "100%" }}
                src={require("../img/not-found-background.jpg")}
                alt=""
                className="not-found-background"
            />
            <div className="not-found-img-container row">
                <img style={{}} src={require("../img/404.png")} alt="" />
                <img
                    style={{}}
                    src={require("../img/not-found-char.png")}
                    alt=""
                />
                <img src={require("../img/figure.png")} alt="" />
            </div>
        </div>
    );
};

export default NotFound;
