import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import { blue } from '@material-ui/core/colors';


import './index.css';
import DnsWebGui from './DnsWebGui';
import { Container, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        logo: {
            maxWidth: 100,
        },

        appbar : {
            background : blue[50],
        }
    }),
);

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © 2019 - ' + new Date().getFullYear() + ' Saul Bertuccio <saul.bertuccio@irccsme.it> '}
            <MuiLink color="inherit" href="https://www.irccsme.it">
                www.irccsme.it
            </MuiLink>
        </Typography>
    );
}

function DnsAppContainer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar} >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img className={classes.logo} alt="IRCCS" src={process.env.PUBLIC_URL + '/logo.png'}/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}  color="textSecondary">
                        Irccs Centro Neurolesi Bonino Puleio
                    </Typography>
                    <Button>Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                       Elenco voci DNS
                    </Typography>
                    <DnsWebGui />
                </Box>
            </Container>
            <Copyright />
        </div>
    );
}

export default DnsAppContainer;
