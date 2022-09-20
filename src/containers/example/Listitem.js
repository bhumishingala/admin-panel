import React, { useCallback, useEffect, useState } from 'react';

function Listitem({ getItem }) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        setItem(getItem(5))
    }, [getItem])

    return (
        <div>
            {
                item.map(r => {
                    return <p>{r}</p>
                })
            }
        </div>
    );
}

export default Listitem;