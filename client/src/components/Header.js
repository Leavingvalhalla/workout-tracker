import { Link, useLocation } from 'react-router-dom';
import Login from './Login';
import { MyConsumer } from './MyContext';
import { Button, Stack } from '@mui/material';

function Header() {
  let location = useLocation();

  return (
    <MyConsumer>
      {(context) => (
        <div className="header">
          <Stack>
            <Link to="/">
              <img src="swole.png" alt="Swole" width={'600px'} />
            </Link>
            <Login />
            {!context.user && (
              <p>
                Don't have an account?{' '}
                <Link to="/signup">Create one here.</Link>
              </p>
            )}
          </Stack>
          {/* {location.pathname !== '/' && (
            <Button sx={{ margin: '1% 5%' }} variant="contained">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                Back to Home
              </Link>
            </Button>
          )} */}
        </div>
      )}
    </MyConsumer>
  );
}

export default Header;
