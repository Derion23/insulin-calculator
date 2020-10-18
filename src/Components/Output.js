import React from 'react'

import '../css/style.css'

export default function Output({totalIE, totalKE, totalCorrectionInsulin, carbohydrateFactor, outputRef}) {
    return (
        <div ref={outputRef}>
            {!(totalIE === '' || totalIE == undefined || totalIE <= 0) ? 

                <p className='output' >
                    {totalKE} KE * {carbohydrateFactor} KE-Faktor <br />
                    + {totalCorrectionInsulin} IE Korrektur-Insulin <br />
                    = {totalIE} IE Insulin
                </p>

             : ''}
        </div>
    )
}
