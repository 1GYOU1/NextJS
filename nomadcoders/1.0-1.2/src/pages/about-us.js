import { useState } from "react";

export default function Potato(){
    const [counter, setCounter] = useState(0);
	return (
        <div>
            <h1>about-us-page {counter}</h1>
            <button onClick={() => {setCounter((prev) => prev + 1)}}>+</button>
        </div>
    )
}