import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const RoundedButton = styled(Button)({
    borderRadius: '3rem',
    fontSize: '0.6rem',
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid #DF5757',
    padding: '0.13rem 0.5rem',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#DF5757',
        color: 'white',
    },
});

export default RoundedButton;
