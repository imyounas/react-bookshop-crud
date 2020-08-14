import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import FormikControl from "../FormControls/FormikControl";
import BookDataService from '../../services/BookDataService';
import AuthorDataService from '../../services/AuthorDataService';
import { toast } from 'react-toastify'
import { RingLoader } from 'react-spinners'

import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function AEForm({ history, match }) {

    console.log('match', match);
    const { id } = match.params;

    const isFormAddMode = !id;

    const initialValues = {
        _id: "",
        name: "",
        isbn: "",
        authorId: ""
    };

    const initLookupValue = { key: "Select Author", value: -1 }

    const formikRef = useRef();
    const [book, setBook] = useState(initialValues);
    const [authorLookup, setAuthorLookup] = useState([initLookupValue]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (!isFormAddMode) {
            console.log("useEffect !isFormAddMode");

            setIsLoading(true);
            BookDataService.get(id).then(response => {
                toast.success('Fetching Book data...')
                console.log(`got response of ${id}`, response.data);

                if (formikRef.current) {
                    formikRef.current.setFieldValue(
                        "name",
                        response.data.name
                    );
                    formikRef.current.setFieldValue(
                        "isbn",
                        response.data.isbn
                    );
                    formikRef.current.setFieldValue(
                        "authorId",
                        response.data.authorId
                    );

                    setBook(response.data);
                }
            }).catch(error => {

                toast.error(`Error while fetching Book`, error)
                console.log(`Error while fetching Book`, error);
            });
        }

    }, [id, isFormAddMode]);
    //now loading authorsdd data
    useEffect(() => {
        AuthorDataService.getlookup().then(response => {

            toast.success('Authors Lookup Recieved...')

            console.log(`got response of Authors Lookup `, response.data);

            setAuthorLookup([initLookupValue, ...response.data]);


        }).catch(error => {

            toast.error(`Error while fetching Authors Lookup`, error)
            console.log(`Error while fetching Authors Lookup`, error);
        });

        setIsLoading(false);


    }, []);


    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Book name should be of at least 3 characters")
            .required("Please provide valid Book name"),

        isbn: Yup.string()
            .min(10, "ISBN should be of at least 10 characters")
            .required("Please provide valid ISBN"),

        authorId: Yup.string().min(12, "Please select valid Author for this book")


    });

    function onSubmit(values, { setStatus, setSubmitting }) {

        //values.authorId = parseInt(values.authorId);
        setStatus();
        if (isFormAddMode) {
            createBook(values, setSubmitting);
        } else {
            updateBook(id, values, setSubmitting);
        }
    };

    function createBook(fields, setSubmitting) {

        setIsLoading(true);
        BookDataService.create(fields)
            .then(response => {
                // alertService.success('User added', { keepAfterRouteChange: true });
                console.log(`got response of createBook `, response);
                toast.success('New Book Created...')
                history.push('/books');
            })
            .catch(error => {
                setSubmitting(false);
                toast.error(`Error while creating Book`, error)
                console.log(`Error while creating Book`, error);

            });

        setIsLoading(false);
    }

    function updateBook(id, fields, setSubmitting) {

        setIsLoading(true);

        fields._id = book._id;
        BookDataService.update(id, fields)
            .then(response => {
                // alertService.success('User updated', { keepAfterRouteChange: true });
                toast.success('Book Update...')
                console.log(`got response of updateBook`, response.data);

                history.push('/books');
            })
            .catch(error => {
                setSubmitting(false);

                toast.error(`Error while updating Book`, error)
                console.log(`Error while updating Book`, error);

            });

        setIsLoading(false);
    }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={book}
            validationSchema={validationSchema}
            onSubmit={onSubmit} >

            {(formik) => {
                return (
                    <div className="container col-md-12">

                        <h3 className="my-5 text-center">{isFormAddMode ? 'Add New Book' : `Update Book : ${book.name}`}</h3>

                        <div className="container col-md-4">


                            <Form>
                                <FormikControl
                                    control='input'
                                    label='Book Name'
                                    name='name'
                                />
                                <FormikControl
                                    control='input'
                                    label='ISBN'
                                    name='isbn'
                                />
                                <FormikControl
                                    control='select'
                                    label='Author Name'
                                    name='authorId'
                                    options={authorLookup}
                                />

                                <div className="mt-n3"><Link to={`/authors/edit/${formik.values.authorId}`} >Edit selected Author</Link></div>


                                <div className="mt-3">
                                    <button type="submit" disabled={!formik.isValid} className="btn btn-primary">
                                        {formik.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                                </button>

                                    <Link to={'/books'} className="btn btn-outline-secondary mx-3">Cancel</Link>
                                    <RingLoader size={60} color='green' loading={isLoading} />
                                </div>
                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default AEForm;
