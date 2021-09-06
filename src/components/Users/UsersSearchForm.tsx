import * as Yup from 'yup';
import styles from './Users.module.css';
import {Field, Form, Formik} from 'formik';
import FieldElement from '../common/Fields/FieldElement';
import React from 'react';
import {FilterType} from '../../redux/reducers/users-reducer';
import {useSelector} from 'react-redux';
import {getUsersFilter} from '../../redux/selectors/users-selectors';

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter);

    const initialValues: selectValuesType = {term: filter.term, friend: String(filter.friend) as FriendFormType};

    const validationSchema = Yup.object({
        term: Yup.string().max(20, 'Searching name is too long')
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: selectValuesType, actions: any) => {

        const selectValues: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        };

        props.onFilterChanged(selectValues);
        actions.setSubmitting(false);
    };

    return (
        <div className={styles.searchingForm}>
            <h1>Friends search</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                {
                    (formik) => (
                        <Form>
                            <FieldElement name='term' component='input' placeholder='Type a name'/>
                            <Field name='friend' as='select'>
                                <option value='null'>All</option>
                                <option value='true'>Only followed</option>
                                <option value='false'>Only unfollowed</option>
                            </Field>
                            <button type='submit' disabled={formik.isSubmitting}>Search</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
});

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'null' | 'true' | 'false';
type selectValuesType = {
    term: string
    friend: FriendFormType
}