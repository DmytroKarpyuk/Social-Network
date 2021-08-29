import {ErrorMessage, Field, useField} from 'formik';
import React from 'react';
import styles from './Fields.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldElement = (props: any) => {
    const [field, meta] = useField(props);
    return (
        <>
            <Field {...field} {...props}
                   className={meta.touched && meta.error ? styles.is_invalid : null}
                   placeholder={props.placeholder}
                   component={props.component}
                   type={props.type}
            />
            <ErrorMessage name={field.name} className={styles.error_message} component='div'/>
        </>
    );
};

export default FieldElement;
