import React, { useState, useEffect } from 'react';
import hexToRgb from './helpers/converter';
import './ColorConverter.css'

export const ColorConverter = () => {
    const [form, setForm] = useState({ hex: '#34495e', rgb: 'rgb(52, 73, 94)' });

    useEffect(() => {
        document.body.style.backgroundColor = form.rgb === 'Ошибка!' ? 'rgb(228, 74, 52)' : form.rgb;
    }, [form.rgb]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

    const handleConvertColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length < 7) {
            return null;
        }

        setForm(prevForm => ({ ...prevForm, hex: value }));

        if (/^#[\dA-Fa-f]{6}$/.test(value)) {
            setForm(prevForm => ({ ...prevForm, rgb: hexToRgb(value) }));
        } else {
            setForm(prevForm => ({ ...prevForm, rgb: 'Ошибка!' }));
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}
            style={{ backgroundColor: form.rgb === 'Ошибка!' ? 'rgb(228, 74, 52)' : form.rgb }}>
            <input className='input' type='text' name='hex' maxLength={7} autoComplete='off'
                autoFocus defaultValue={form.hex} onChange={handleConvertColor}/>
            <output className='output' name='rgb'>
                <span className='output-text'>{form.rgb}</span>
            </output>
        </form>
    );
};