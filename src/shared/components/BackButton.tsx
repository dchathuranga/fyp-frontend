import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackButtonProps = 'Favorites' | 'Home';

const BackButton = ({type}: {type: BackButtonProps}) => {
  const navigate = useNavigate();
  const path = type === 'Favorites' ? '/favorites' : '/';
  const text = type === 'Favorites' ? 'Back to Favorites' : 'Back to Home';

  return (
    <Button
      onClick={() => navigate(path)}
      startIcon={<ArrowBackIcon />}
      variant="contained"
      color="primary"
      sx={{ mb: 2 }}
    >
      {text}
    </Button>
  );
};

export default BackButton; 