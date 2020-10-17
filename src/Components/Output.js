import React from 'react'

import '../style.css'

export default function Output({totalIE}) {
    return (
        <div>
            <p>
                <h3> {!(totalIE === '' || 
                totalIE == undefined ||
                totalIE <= 0
                ) ? `Du musst dir ${totalIE} IE spritzen` : ''}</h3>
            </p>
        </div>
    )
}
