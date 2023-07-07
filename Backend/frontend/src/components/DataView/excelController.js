
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';

const excelController = () => {
    return(
        <>
    <Stack spacing={3}>
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
        >
            <Stack spacing={1}>
            <Typography variant="h4">
                Customers
            </Typography>
            <Stack
                alignItems="center"
                direction="row"
                spacing={1}
            >
                <Button
                color="inherit"
                startIcon={(
                    <SvgIcon fontSize="small">
                    <ArrowUpOnSquareIcon />
                    </SvgIcon>
                )}
                >
                Import
                </Button>
                <Button
                color="inherit"
                startIcon={(
                    <SvgIcon fontSize="small">
                    <ArrowDownOnSquareIcon />
                    </SvgIcon>
                )}
                >
                Export
                </Button>
            </Stack>
            </Stack>
            <div>
            <Button
                startIcon={(
                <SvgIcon fontSize="small">
                    <PlusIcon />
                </SvgIcon>
                )}
                variant="contained"
            >
                Add
            </Button>
            </div>
        </Stack>
    </Stack>
    </>
    );
   
};

export default excelController;
