import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import FormikControl from "../FormControls/FormikControl";
import AuthorDataService from '../../services/AuthorDataService';
import { toast } from 'react-toastify'
import { RingLoader } from 'react-spinners'

import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function AuthorForm({ history, match }) {


    const { id } = match.params;

    const isFormAddMode = !id;

    const initialValues = {
        _id: "",
        firstName: "",
        lastName: ""
    };

    const formikRef = useRef();
    const [author, setAuthor] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (!isFormAddMode) {
            console.log("useEffect !isFormAddMode");

            setIsLoading(true);
            AuthorDataService.get(id).then(response => {
                toast.success('Reecived Author data...')
                console.log(`got response of ${id} , ${response.data} `);

                if (formikRef.current) {
                    formikRef.current.setFieldValue(
                        "firstName",
                        response.data.firstName
                    );
                    formikRef.current.setFieldValue(
                        "lastName",
                        response.data.lastName
                    );

                    setAuthor(response.data);
                    console.log('state object ', author);
                }
            }).catch(error => {

                toast.error(`Error while fetching Author`, error)
                console.log(`Error while fetching Author`, error);
            });

            setIsLoading(false);
        }
    }, []);


    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(3, "First name should be of at least 3 characters")
            .required("Please provide valid first name"),

        lastName: Yup.string()
            .min(3, "Last name should be of at least 3 characters")
            .required("Please provide valid last name"),
    });

    function onSubmit(values, { setStatus, setSubmitting }) {
        console.log("Author Form data", values);

        setStatus();
        if (isFormAddMode) {
            createAuthor(values, setSubmitting);
        } else {
            updateAuthor(id, values, setSubmitting);
        }
    };

    function createAuthor(fields, setSubmitting) {

        setIsLoading(true);
        AuthorDataService.create(fields)
            .then(response => {
                // alertService.success('User added', { keepAfterRouteChange: true });
                console.log('got response of createAuthor', response.data);
                toast.success('New Author Successfully Created...')
                history.push('/authors');
            })
            .catch(error => {
                setSubmitting(false);
                toast.error(`Error while creating Author`, error)
                console.log(`Error while creating Author`, error);

            });

        setIsLoading(false);
    }

    function updateAuthor(id, fields, setSubmitting) {

        setIsLoading(true);
        fields._id = author._id;

        AuthorDataService.update(id, fields)
            .then(response => {
                // alertService.success('User updated', { keepAfterRouteChange: true });
                toast.success('Author Updated Successfully...')
                console.log(`got response of updateAuthor`, response);

                history.push('/authors');
            })
            .catch(error => {
                setSubmitting(false);

                toast.error(`Error while updating Author`, error)
                console.log("Error while updating Author", error);

            });

        setIsLoading(false);
    }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={author}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>

            {(formik) => {
                return (
                    <div className="container col-md-12">

                        <h3 className="my-5 text-center">{isFormAddMode ? 'Add New Author' : `Update Author : ${author.firstName}`}</h3>

                        <div className="container col-md-4">


                            <Form>
                                <FormikControl
                                    control='input'
                                    label='First Name'
                                    name='firstName'
                                />
                                <FormikControl
                                    control='input'
                                    label='Last Name'
                                    name='lastName'
                                />

                                <button type="submit" disabled={!formik.isValid} className="btn btn-primary">
                                    {formik.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}

                                Save
                                </button>


                                <Link to={'/authors'} className="btn btn-outline-secondary mx-3">Cancel</Link>
                                <RingLoader size={60} color='green' loading={isLoading} />

                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default AuthorForm;
