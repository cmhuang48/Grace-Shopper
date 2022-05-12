import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import MiniCart from './MiniCart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ fontFamily: 'sofia', fontSize: '16px', color: '#f58d72', textTransform: 'none'}}
        >
          {props.title}
        </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:'10'}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
              {props.menuList ? (
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {props.menuList.map((item, idx) => {
                    if (item === "Cakes" || item === "Cupcakes") { 
                      return <MenuItem key={idx} component={Link} to={`/${item}`} onClick={handleClose} style={{ fontFamily: 'sofia', fontSize: '16px', color: '#f58d72', textTransform: 'none' }}>{item}</MenuItem>;
                    } else if (item === "Customize!") {
                      return <MenuItem key={idx} component={Link} to='/custom' onClick={handleClose} style={{ fontFamily: 'sofia', fontSize: '16px', color: '#f58d72', textTransform: 'none' }}>{item}</MenuItem>;
                    } 
                  })}
                </MenuList>
              ) : (
                <div>
                  <MiniCart />
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem component={Link} to='/cart' onClick={handleClose} style={{ fontFamily: 'sofia', fontSize: '16px', color: '#f58d72', textTransform: 'none' }}>Go to Cart!</MenuItem>
                  </MenuList>
                </div>
              )}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
      </div>
    </div>
  );
}