

import axios from "axios";
import React, { useEffect, useState } from "react";

export function Minted({newPlanets, close}) {



    const [newList, setNewList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true)
        Promise.all(newPlanets.map(({uri})=>axios.get(uri))).then((results) => {
            setNewList(results.map(r => r.data))
        }).finally(() => {
            setLoading(false)
        })

    }, [newPlanets])




    if(newPlanets && newPlanets.length) {
        return <div className="modal" style={{display: 'block'}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Congratulations! You mint {newPlanets.length} planets.</h5>
            </div>
            <div className="modal-body" style={{minHeight: '500px'}}>
                {loading && 'Loading....'}


                {newList.map(planet => (<div className="planet" key={planet.name}>
                    <div className="imgWrapper">
                        <img src={planet.img} alt={planet.name}/>
                    </div>
                    <div className="title">
                        <div>{planet.name}</div>
                        <div>{planet.desc}</div>
                    </div>
                </div>))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}>Close</button>
            </div>
          </div>
        </div>
      </div>
    }

    return null;
}
