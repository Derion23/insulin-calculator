import React from 'react'

import '../css/style.css'

export default function Output(
    {totalIE, totalMainMealKE, totalIntermealKE, totalKE, totalCorrectionInsulin, outputRef}) {
    return (
        <div>
            {!(totalIE === '' || totalIE == undefined || totalIE <= 0) ? 
                <div>
                    <hr />

                    <div ref={outputRef} className='space-around'>
                        
                        <p className='output' >
                            Hauptmahlzeit-KE : {totalMainMealKE} KE <br />
                            Zwischenmahlzeit-KE : {totalIntermealKE} KE <br />
                            Gesamt-KE: {totalKE} KE <br />
                            <br />
                            Korrektur-Insulin: {totalCorrectionInsulin} IE  <br />
                            <span style={{fontWeight: 'bold'}}> Gesamt-Insulin: {totalIE} IE </span>
                        </p>
                            
                    </div>
                </div>
            : ''}
        </div>
    )
}
