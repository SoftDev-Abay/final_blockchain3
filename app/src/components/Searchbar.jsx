import React, { useEffect, useState } from 'react';

function Searchbar({ searchString, setSearchString }) {
    return (
        <div className="searchbar">
            <img
                src="/assets/search-gray.svg"
                alt="search"
                width={24}
                height={24}
                className="object-contain"
            />
            <input
                id="text"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder={'Search by username'}
                className="no-focus searchbar_input text-white"
            />
        </div>
    );
}

export default Searchbar;
