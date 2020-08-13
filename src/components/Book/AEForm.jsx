import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import { Link, useParams } from 'react-router-dom';
import * as Yup from "yup";
import FormikControl from "../FormControls/FormikControl";
import BookDataService from '../../services/BookDataService';
import AuthorDataService from '../../services/AuthorDataService';
import { toast } from 'react-toastify'
import { RingLoader } from 'react-spinners'

import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function AEForm({ history, match }) {

    let { slug } = useParams()
    const { path } = match;

    console.log(history);
    console.log(path);
    console.log(slug);


    const { id } = match.params;

    const isFormAddMode = !id;

    const initialValues = {
        id: -1,
        name: "",
        isbn: "",
        authorId: -1
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
                console.log(`got response of ${id} , ${response} `);
                console.log(response);
                console.log(response.data);
                if (formikRef.current) {
                    formikRef.current.setFieldValue(
                        "name",
                        response.data.name
                    );
                    formikRef.current.setFieldValue(
                        "isbn",
                        response.data.isbn
                    );
                    setBook(response.data);
                }
            }).catch(error => {

                toast.error(`Error while fetching Book ${error}`)
                console.log(`Error while fetching Book ${error}`);
            });
        }

    }, [id, isFormAddMode]);
    //now loading authorsdd data
    useEffect(() => {
        AuthorDataService.getlookup().then(response => {

            toast.success('Authors Lookup Recieved...')

            console.log(`got response of Authors Lookup `);
            console.log(response.data);
            setAuthorLookup([initLookupValue, ...response.data]);
            console.log("new Lookup");
            console.log(authorLookup);

        }).catch(error => {

            toast.error(`Error while fetching Authors Lookup ${error}`)
            console.log(`Error while fetching Authors Lookup ${error}`);
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

        authorId: Yup.number().min(1, "Please select valid Author for this book")


    });

    function onSubmit(values, { setStatus, setSubmitting }) {
        console.log("Book Form data", values);
        values.authorId = parseInt(values.authorId);
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
                console.log(`got response of createBook , ${response} `);
                console.log(response);
                toast.success('New Book Created...')
                history.push('/books');
            })
            .catch(error => {
                setSubmitting(false);
                toast.error(`Error while creating Book ${error}`)
                console.log(`Error while creating Book ${error}`);
                console.log(error);
            });

        setIsLoading(false);
    }

    function updateBook(id, fields, setSubmitting) {

        setIsLoading(true);
        BookDataService.update(id, fields)
            .then(response => {
                // alertService.success('User updated', { keepAfterRouteChange: true });
                toast.success('Book Update...')
                console.log(`got response of updateBook , ${response} `);
                console.log(response);

                history.push('/books');
            })
            .catch(error => {
                setSubmitting(false);

                toast.error(`Error while updating Book ${error}`)
                console.log("ops error");
                console.log(error);
            });

        setIsLoading(false);
    }

    function handleChangeEvent(event) {

        event.stopPropagation()
        console.log("select change event in parent");
        console.log(event);
    };


    return (
        <Formik
            innerRef={formikRef}
            initialValues={book}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>

            {(formik) => {
                return (
                    <div className="container col-md-12">

                        <h3 className="my-5 text-center">{isFormAddMode ? 'Add New Book' : `Update Book ${book.name}`}</h3>

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
                                    // onValueChangeEvent={handleChangeEvent}
                                    options={authorLookup}
                                />

                                {
                                    book.authorId < 0
                                        ? <div><Link to={`author/edit/${book.authorId}`} className="mb-10 btn-outline-secondary mx-3">Edit selected Author</Link></div>
                                        : null
                                }
                                <button type="submit" disabled={!formik.isValid} className="btn btn-primary">
                                    {formik.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}

                                Save
                                </button>


                                <Link to={'/books'} className="btn btn-outline-secondary mx-3">Cancel</Link>
                                <RingLoader size={60} color='green' loading={isLoading} />

                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default AEForm;
