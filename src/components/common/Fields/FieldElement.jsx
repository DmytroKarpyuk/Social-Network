import {ErrorMessage, Field, useField} from "formik";
import React from "react";
import styles from './Fields.module.css';

const FieldElement = props => {
    const [field, meta] = useField(props);
    return (
        <div>
            <Field {...field} {...props}
                   className={meta.touched && meta.error ? styles.is_invalid : null}
                   placeholder={props.placeholder}
                   component={props.component}
                   type={props.type}
            />
            <ErrorMessage name={field.name} className={styles.error_message} component='div'/>
        </div>
    )
};

export default FieldElement;
