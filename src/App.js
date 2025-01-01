import { useReducer, useEffect } from 'react';
import { DEFAULT_LANGUAGES, RELIGIONLIST } from './data';
import './App.css';

const formJson = {
    sectionName: 'Registration Form',
    sectionDisplayName: 'Registration Form',
    visible: true,
    formDesign: true,
    fields: [
        {
            visible: true,
            fieldName: 'firstName',
            fieldLabel: 'First Name',
            type: 'text',
            defaultValue: 'sankeerth',
        },
        {
            visible: true,
            fieldName: 'lastName',
            fieldLabel: 'Last Name',
            type: 'text',
            defaultValue: 'gunnala',
        },
        {
            visible: true,
            fieldName: 'email',
            fieldLabel: 'Email',
            type: 'email',
            defaultValue: 'gunnala@gmail.com',
        },
        {
            visible: true,
            fieldName: 'password',
            fieldLabel: 'Password',
            type: 'password',
            defaultValue: 'secret',
        },
        {
            visible: true,
            fieldName: 'dob',
            fieldLabel: 'Date Of Birth',
            type: 'dob',
            defaultValue: '1998-08-11',
        },
        {
            visible: true,
            fieldName: 'gender',
            fieldLabel: 'Gender',
            type: 'radio',
            defaultValue: 'male',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
        },
        {
            visible: true,
            fieldName: 'religion',
            fieldLabel: 'Religion',
            type: 'select',
            defaultValue: 'Hindu',
            options: RELIGIONLIST,
        },
        {
            visible: true,
            fieldName: 'language',
            fieldLabel: 'Language',
            type: 'select',
            defaultValue: 'Telugu',
            options: DEFAULT_LANGUAGES,
        },
        {
            visible: true,
            fieldLabel: 'Register',
            type: 'btn',
        },
    ],
};

const reducerFunction = (state, newState) => ({
    ...state,
    ...newState,
});

function App() {
    const [state, setState] = useReducer(reducerFunction, {});

    useEffect(() => {
        updateFormkeysAndValues();
    }, [JSON.stringify(formJson)]);

    const updateFormkeysAndValues = () => {
        const s = formJson.fields.reduce((acc, e) => {
            if (e.type !== 'btn') {
                acc[e.fieldName] = e.type === 'checkbox' ? e.defaultValue || false : e.defaultValue || null;
            }
            return acc;
        }, {});
        setState(s);
    };

    const handleSubmit = () => {
        console.log(state, 'state');
    };

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ [name]: value });
    };

    const renderMethod = f => {
        const fname = ['text', 'email', 'number', 'password'].find(e => e === f.type);

        const fvalue = state[f?.fieldName];

        switch (f.type) {
            case fname:
                return (
                    <>
                        <label>{f.fieldLabel}</label>:
                        <input type={fname} name={f.fieldName} value={fvalue} placeholder={f.fieldLabel} onChange={handleChange} />
                        <br />
                    </>
                );
            case 'radio':
                return (
                    <div className='flex'>
                        <span>{f.fieldLabel}</span>
                        <span style={{ display: 'flex' }}>
                            {f.options.map(({ label, value }) => (
                                <span key={label}>
                                    <input type='radio' name={f.fieldName} id={label} value={value} checked={fvalue === value} placeholder={f.fieldLabel} onChange={handleChange} />
                                    <label>{label}</label>
                                </span>
                            ))}
                        </span>
                        <br />
                    </div>
                );
            case 'dob':
                return (
                    <>
                        <label>{f.fieldLabel}</label>:
                        <input type='date' name={f.fieldName} value={fvalue} onChange={handleChange} />
                        <br />
                    </>
                );
            case 'select':
                return (
                    <>
                        <label>{f.fieldLabel}</label>:
                        <select name={f.fieldName} value={fvalue} onChange={handleChange}>
                            {f?.options?.map(({ label, value }) => (
                                <option key={label} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <br />
                    </>
                );
            case 'btn':
                return (
                    <div className='btn'>
                        <button onClick={handleSubmit}>{f.fieldLabel}</button>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div className='formContainer'>
            <fieldset>
                <legend>{formJson.sectionDisplayName}</legend>
                <div className='container'>
                    {formJson.fields.map(e => (
                        <div key={e.fieldName} className='margin'>
                            {renderMethod(e)}
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default App;
