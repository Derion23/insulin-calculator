import React from 'react'

import '../css/style.css'

export default function Output({totalIE, outputRef}) {
    return (
        <div >
            <p className='output' ref={outputRef}>
                {!(totalIE === '' || 
                totalIE == undefined ||
                totalIE <= 0
                ) ? `Du musst dir ${totalIE} IE spritzen` : ''}
            </p>
        </div>
    )
}
