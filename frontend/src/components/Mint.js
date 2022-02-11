

import React, { useState } from "react";

export function Mint({mint, minting}) {



    const [count, setCount] = useState(1);

    const add = () => {
        setCount(count+1)
    }
    const minus = () => {

        setCount(count-1)
    }
  return (
    <div>
        <div className="row inline">
            <button type="button" className="btn btn-outline-primary" disabled={count <2} onClick={minus}>-</button>
            <div className="count">{count}</div>
            <button type="button" className="btn btn-outline-primary" onClick={add}>+</button>
        </div>
        <div className="row inline">
            <button type="button" className="btn btn-primary mint" onClick={() => mint(count)} disabled={minting}> 
            Mint{minting && '...'}</button>
        </div>
    </div>
  );
}
