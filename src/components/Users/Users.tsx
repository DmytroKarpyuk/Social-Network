import React from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import {UserType} from '../../types/types';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import FieldElement from '../common/Fields/FieldElement';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
};

const Users: React.FC<PropsType> = ({currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props}) => {
    return (
        <>
            <UsersSearchForm/>
            <div className={styles.Users}>
                {
                    users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress}
                                         follow={props.follow}
                                         unFollow={props.unFollow}/>
                    )
                }
            </div>
            <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />
        </>
    );
};

const UsersSearchForm = () => {
    const initialValues = {term: ''};
    const validationSchema = Yup.object({
        term: Yup.string().max(20, 'Searching name is too long')
    });
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className={styles.searchingForm}>
            <h1>Friend`s searching form</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    () => (
                        <Form>
                            <FieldElement name='term' component='input' placeholder='Type a name'/>
                            <button type='submit'>Search</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};

export default Users;