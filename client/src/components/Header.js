import { Link } from 'react-router-dom';
import Login from './Login';
import { MyConsumer } from './MyContext';
import { Stack } from '@mui/material';

function Header() {
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
                Don't have an account? <Link to="/signup">Create one now!</Link>
              </p>
            )}
          </Stack>
        </div>
      )}
    </MyConsumer>
  );
}

export default Header;
