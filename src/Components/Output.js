import React from 'react'

import '../css/style.css'

export default function Output(
    {totalIE, totalKE, totalIntermealKE, totalCorrectionInsulin, carbohydrateFactor, outputRef}) {
    return (
        <div ref={outputRef}>
            {!(totalIE === '' || totalIE == undefined || totalIE <= 0) ? 

                <p className='output' >
                    Gesamt-KE: {totalKE} KE <br />
                    Zwischenmahlzeit-KE : {totalIntermealKE} KE<br />
                    <br />
                    Korrektur-Insulin: {totalCorrectionInsulin} IE  <br />
                    Gesamt-Insulin: {totalIE} IE
                </p>

             : ''}
        </div>
    )
}
