import React from 'react'

import '../css/style.css'

export default function Output({totalIE}) {
    return (
        <div>
            <p className='output'>
                {!(totalIE === '' || 
                totalIE == undefined ||
                totalIE <= 0
                ) ? `Du musst dir ${totalIE} IE spritzen` : ''}
            </p>
        </div>
    )
}
