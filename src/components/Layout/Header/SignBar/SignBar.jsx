import './SignBar.css';
//
import usa from '../../../../assets/img/usa.png';
import vnm from '../../../../assets/img/vnm.png';
//
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SignBar = () => {
    const text =
        'Afterpay, Laybuy & Genoapay | Free Delivery New Zealand + Australia*';

    const langs = [
        {
            name: 'USA',
            flag: usa,
        },
        {
            name: 'VNM',
            flag: vnm,
        },
    ];

    const [flag, setFlag] = useState(usa);

    const handelChange = (event) => {
        if (event.target.value === 'VNM') {
            setFlag(vnm);
        } else {
            setFlag(usa);
        }
    };

    return (
        <div className='SignBar'>
            <div className='SignBar__Text'>{text}</div>
            <div className='SignBar__SignRegis '>
                <div className='SignBar__SignRegis-Link'>
                    <abbr title='Login'>
                        <NavLink
                            to='/userLogin'
                            className={({ isActive }) =>
                                isActive ? 'active' : 'inactive'
                            }>
                            Sign In
                        </NavLink>
                    </abbr>
                    /
                    <abbr title='Sign Up'>
                        <NavLink
                            to='/userRegister'
                            className={({ isActive }) =>
                                isActive ? 'active' : 'inactive'
                            }>
                            Register
                        </NavLink>
                    </abbr>
                </div>
                <div className='SignBar__Languages '>
                    <label
                        htmlFor='lang'
                        className='LangLabel '>
                        <img
                            src={flag}
                            alt='flag'
                        />
                    </label>
                    <select
                        className='LangSelect '
                        name='lang'
                        id='lang'
                        onChange={handelChange}>
                        {langs.map((item) => (
                            <option
                                className='LangOption '
                                key={item.name}
                                value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SignBar;
