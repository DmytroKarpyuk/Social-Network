import {Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";
import FieldElement from "../../common/Fields/FieldElement";
import styles from './Dialogs.module.css';

const DialogForm = props => {
    const validate = Yup.object({
        newMessageBody: Yup.string()
            .max(50, 'Too Long!')
    })
    return (
        <Formik initialValues={{newMessageBody: ''}} onSubmit={props.addNewMessage} validationSchema={validate}>
            <Form>
                <FieldElement name='newMessageBody' component='textarea' placeholder='Enter your message text'/>
                <div>
                    <button className={styles.send_btn} type='submit'>Send</button>
                </div>
            </Form>
        </Formik>
    )
};

export default DialogForm;
