
import styled from 'styled-components'

export const StyledInputDiv = styled.div`
    width: 6em;

    input {
        background-color: #181818;
        color: #ddd;
        height: 1em;
        width: 3.5em;
        border: none;
        border-bottom: solid .1em gray;
        font-size: 110%;
        text-align: center;
    }

    .error {
        position: absolute;
        top: .1em;
        color: red;
        font-size: 70%;
    }

`
