const Loader = ({ fill = "#FFF", height = 28, inline = false, right = 0 }) => {
    return (
        <svg
            version="1.1"
            id="L4"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enable-background="new 0 0 0 0"
            xml:space="preserve"
            style={{
                width: inline ? "auto" : "100%",
                height: height,
                display: inline ? "inline" : "block",
                top: inline ? "6px" : 0,
                position: inline ? "absolute" : "static",
                right: right,
            }}
        >
            <circle stroke="none" cx="6" cy="50" r="10" style={{ fill: fill }}>
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1"
                />
            </circle>
            <circle stroke="none" cx="36" cy="50" r="10" style={{ fill: fill }}>
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.2"
                />
            </circle>
            <circle stroke="none" cx="66" cy="50" r="10" style={{ fill: fill }}>
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.3"
                />
            </circle>
        </svg>
    );
};

export default Loader;
