import React from "react";
import {Field, Form, Formik} from "formik";
import {required} from "../../../../utils/validators";

const NewPostForm = props => {
    return (
        <Formik initialValues={{newPostBody: ''}} onSubmit={props.addNewPost}>
            <Form>
                <Field name='newPostBody' placeholder='Enter your post text' component='textarea' validate={required}/>
                <div>
                    <button>Add post</button>
                </div>
            </Form>
        </Formik>
    )
};

export default NewPostForm;