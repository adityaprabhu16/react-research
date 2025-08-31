import { useState, useEffect } from 'react';

//To treat as a prop, need the braces.
function ReactComponent({input}) {
    const [date, setDate] = useState(new Date());

    //Use effect to keep track of timing
    useEffect(() => {
        if(!input) {
            //update date every one second, trigger re-render due to setDate
            const interval = setInterval(() => setDate(new Date()), 1000);
            //clean up after unmount:
            return () => clearInterval(interval);
        }
    }, [input])

    if (!input) {
        return (
            <div>
                {
                    date.toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })
                }
            </div>
        )
    }
    else if (Array.isArray(input)) {
        return (
            <div className="container-div">
                {
                    input.map((element, index) => (
                        <div key={index}>{element}</div>
                    ))
                }
            </div>
        )
    }
    else {
        return (
            <div>{input}</div>
        )
    }
}

export default ReactComponent;