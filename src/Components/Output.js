import React from 'react'

import '../css/style.css'

export default function Output(
    {totalIE, totalMainMealKE, totalIntermealKE, totalKE, totalCorrectionInsulin, outputRef}) {
    return (
        <div ref={outputRef}>
            {!(totalIE === '' || totalIE == null || totalIE <= 0) ? 
                <div>
                    <hr />

                    <div className='space-around'>
                        
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
