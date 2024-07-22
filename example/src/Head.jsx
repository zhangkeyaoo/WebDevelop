import { useState } from "react";

function Head(){
    const[count,setCount]=useState(0)

    return(
        <>
            <div><h1>兴趣圈</h1></div>
        </>
    );
}

export default Head;