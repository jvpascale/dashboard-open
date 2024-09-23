import React from 'react'
import './styles.css'

interface TesourariaCarteiraProps {
    children: React.ReactNode
}

export default function TesourariaCarteira(props: TesourariaCarteiraProps) {
    return (
        <div className='tesouraria-carteira'>
            {props.children}
        </div>
    )
}