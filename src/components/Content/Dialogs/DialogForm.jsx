import {Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";
import FieldElement from "../../common/Fields/FieldElement";

const DialogForm = props => {
    const validate = Yup.object({
        newMessageBody: Yup.string()
            .max(50, 'Too Long!')
    })
    return (
        <Formik initialValues={{newMessageBody: ''}} onSubmit={props.addNewMessage} validationSchema={validate}>
            <Form>
                <FieldElement name='newMessageBody' component='textarea' placeholder='Enter your message text'/>
                <button type='submit'>Send</button>
            </Form>
        </Formik>
    )
};

export default DialogForm;
