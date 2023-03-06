import React, { useState } from "react";

const MovieForm = (props) => {
    const [title, setTitle] = useState('');
    const [openingText, setOpeningText] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const openingTextHandler = (event) => {
        setOpeningText(event.target.value);
    }

    const releaseDateHandler = (event) => {
        setReleaseDate(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        props.onAddMovie(title, openingText, releaseDate);
        setTitle('');
        setOpeningText('');
        setReleaseDate('');
    };

    return ( <
        React.Fragment >
        <
        section >
        <
        form onSubmit = { submitHandler } >
        <
        div >
        <
        label > Title < /label> <
        input type = "text"
        id = "title"
        value = { title }
        onChange = { titleHandler }
        /> <
        /div> <
        div >
        <
        label > Opening Text < /label> <
        textarea type = "text"
        id = "opening-text"
        rows = '5'
        value = { openingText }
        onChange = { openingTextHandler } > < /textarea> <
        /div> <
        div >
        <
        label > Release Date < /label> <
        input type = "text"
        id = "release-date"
        value = { releaseDate }
        onChange = { releaseDateHandler }
        /> <
        /div> <
        button > Add Movie < /button> <
        /form> <
        /section> <
        /React.Fragment>
    );
};

export default MovieForm;