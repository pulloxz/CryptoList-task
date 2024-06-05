import React, { useState } from 'react';
import './main.css';
import { FaRegHeart, FaSearch, FaHeart } from 'react-icons/fa';
import { img1, img2, img3, img4, img5, img6 } from './assets';

const CryptoList = () => {
    const [segment, setSegment] = useState('All');
    const [query, setQuery] = useState("");
    const [selectedCrypto, setSelectedCrypto] = useState('eth'); 

    const cryptos = [
        { id: 'btc', name: 'BTC', img: img1, favorite: false, usdt: false },
        { id: 'eth', name: 'ETH', img: img2, favorite: false, usdt: false },
        { id: 'doge', name: 'DOGE', img: img3, favorite: false, usdt: true },
        { id: 'algo', name: 'ALGO', img: img4, favorite: true, usdt: true },
        { id: 'ada', name: 'ADA', img: img5, favorite: false, usdt: false },
        { id: 'luna', name: 'LUNA', img: img6, favorite: false, usdt: false }
    ];

    const filteredCryptos = () => {
        let filtered = cryptos;
        if (segment === 'USDT') {
            filtered = filtered.filter(crypto => crypto.usdt);
        } else if (segment === 'Favorites') {
            filtered = filtered.filter(crypto => crypto.favorite);
        }
        if (query) {
            filtered = filtered.filter(crypto => crypto.name.toLowerCase().includes(query.toLowerCase()));
        }
        return filtered;
    };

    return (
        <div className="container">
            <div className="tap-segmentation">
                <button className="btn" onClick={() => setSegment('All')}>All</button>
                <button className="btn" onClick={() => setSegment('USDT')}>USDT</button>
                <button className="btn" onClick={() => setSegment('Favorites')}>
                    <span style={{ border: 'none' }}>
                        <FaRegHeart />
                    </span>
                </button>
            </div>
            <div className="search-bar" id="search">
                <button type="submit" style={{ border: 'none', backgroundColor: 'transparent', fontSize: '20px' }}>
                    <FaSearch />
                </button>
                <input 
                    type="text" 
                    placeholder="Search ETH, BTC, ..." 
                    name="search" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
            </div>
            <div className="content-menu" id="menu">
                <ul>
                    {filteredCryptos().map(crypto => (
                        <li key={crypto.id} id={crypto.id}>
                            <div 
                                className={`crypto ${selectedCrypto === crypto.id ? 'crypto-selected' : ''}`} 
                                onClick={() => setSelectedCrypto(crypto.id)} 
                            >
                                <img src={crypto.img} alt={crypto.name} className="crypto-logo" />
                                <span className="crypto-name">{crypto.name}</span>
                                {crypto.favorite ? <FaHeart /> : <FaRegHeart />}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CryptoList;
