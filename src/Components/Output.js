import React from 'react'

import '../css/style.css'

export default function Output(
    {totalIE, totalMainMealKE, totalIntermealKE, totalKE, totalCorrectionInsulin, outputRef}) {
    return (
        <div ref={outputRef}>
            {!(totalIE === '' || totalIE == undefined || totalIE <= 0) ? 

                <p className='output' >
                    Hauptmahlzeit-KE : {totalMainMealKE} KE <br />
                    Zwischenmahlzeit-KE : {totalIntermealKE} KE <br />
                    Gesamt-KE: {totalKE} KE <br />
                    <br />
                    Korrektur-Insulin: {totalCorrectionInsulin} IE  <br />
                    Gesamt-Insulin: {totalIE} IE
                </p>

             : ''}
        </div>
    )
}
