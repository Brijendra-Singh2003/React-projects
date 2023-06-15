import { useState, useEffect } from "react"

function Width() {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function resize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", resize)
        return () => {
                    window.removeEventListener("resize", resize)
                }
    }, [])

    return (
        <h1 style={{color: "#f2a57f"}}>
            width of the screen is {width}
        </h1>
    )
}

export default Width;