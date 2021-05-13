import {Field, Form, Formik} from "formik";
import React from "react";

const DialogForm = props => {
    return (
        <Formik initialValues={{newMessageBody: ''}} onSubmit={props.addNewMessage}>
            <Form>
                <div>
                    <Field placeholder='Enter you message' name='newMessageBody' component='textarea'/>
                </div>
                <button type='submit'>Send</button>
            </Form>
        </Formik>
    )
};

export default DialogForm;
