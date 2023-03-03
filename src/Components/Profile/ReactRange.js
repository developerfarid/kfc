import React, { useState } from 'react';
import InputRange from 'react-input-range';

const ReactRange = ({number}) => {
    const [value, setValue] = useState(number);
    console.log(value);

    return (
        <InputRange maxValue={100} minValue={0} value={value} onChange={((value) => setValue(value))}   />
    );
};

export default ReactRange;