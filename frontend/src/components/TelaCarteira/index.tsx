import React from 'react'
import './styles.css'

interface TelaCarteiraProps {
    children: React.ReactNode
}

export default function TelaCarteira(props: TelaCarteiraProps) {
    return (
        <div className='tela-carteira'>
            {props.children}
            
        </div>
        
        )
}
