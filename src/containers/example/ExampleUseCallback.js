import React, { useCallback, useState } from 'react';
import Listitem from './Listitem';

function ExampleUseCallback(props) {
    const [theme,setTheme] = useState(false);
    const [num,setNum] = useState(0);

    const Toggle_theme = {
        backgroundColor : theme ? '#000' : '#fff',
        color : theme ? '#fff' : '#000'
    }

    const getItem = useCallback((inc) => {
        return[inc + num , inc + num + 1, inc + num + 2]
    },[num])

    return (
        <div style={Toggle_theme}>
            <button onClick={() => setTheme(!theme)}>Toggle Theme</button>

            <br />
            <input type="text" onChange={(e) => setNum(parseInt(e.target.value))}/>
            <Listitem getItem = {getItem}/>
        </div>
    );
}

export default ExampleUseCallback;