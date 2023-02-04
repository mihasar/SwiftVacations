import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import "./Footer.css";

function Footer(): JSX.Element {

    const [page, setPage] = useState(1);

    // function handleChange(p) {
    //     setPage(p);
    // }

    return (
        <div className="Footer">
            <Stack spacing={2}>
                <Pagination count={5} color="primary" />
            </Stack>
            <p> All Rights Reserved to Michael saravaisky ©️</p>
        </div>
    );
}

export default Footer;
