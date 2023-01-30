const buttonBase = {
    // fontSize: "16px",
    border: "2px solid white",
    borderRadius: "4px",
    backgroundColor: "white"
}

const button = {
    primary: {
        ...buttonBase,
        border: "2px solid #087ea4",
        backgroundColor: "#087ea4",
        color: "white"
    },
    success: {
        ...buttonBase,
        border: "2px solid #22863a",
        backgroundColor: "#22863a",
        color: "white"
    },
    danger: {
        ...buttonBase,
        color: "#d73a49"
    }
}

const style = {
    ul: { display: "flex", flexDirection: "column", rowGap: "8px", padding: "0 16px" },
    li: { display: "flex", justifyContent: "space-between" },
    button: button,
    container: { maxWidth: "400px", margin: "0 auto", padding: "72px 0" }
}

export default style;