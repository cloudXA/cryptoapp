import React from 'react'
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const Exchanges = () => {
    console.log('exchange', useGetCryptoDetailsQuery('Qwsogvtv82FCd'))
    return (
        <div>
            Exchanges
        </div>
    )
}

export default Exchanges
