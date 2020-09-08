import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import cityList from '../../constants/cityNames';

function DropDown(props) {
    const [cityListChecked, setcityListChecked] = useState([]);

    const addChoice = (city) => {
        setcityListChecked([...cityListChecked, city])
    }

    const removeChecked = (removeCity) => {
        setcityListChecked(
            cityListChecked.filter(city => (
                city.text !== removeCity && city
            ))
        )
    }

    return (
        <div>
            <div className='dropdown-label'>City<p className="required">*</p></div>
            <div className='dropdown-input-container'>
                <div className='dropdown-input'>
                    <div className='dropdown-checked-container'>
                        {cityListChecked.map(city => (
                            <div
                                key={city.key}
                                className='dropdown-checked'>
                                {city.text}
                                <FontAwesome className='fas fa-close dropdown-checked-close'
                                    onClick={() => removeChecked(city)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='dropdown-list'>
                    {cityList.map(city => (
                        <div
                            key={city.key}
                            className='dropdown-choice'
                            onClick={() => addChoice(city.text)}
                        >
                            {city.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropDown;