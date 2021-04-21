import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Sample from './components/Sample';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Sample2 from './components/Sample2';

const useStyles = makeStyles( {
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px'
  }
});


function App() {
  const classes = useStyles();
  return (
    <>
      <Home />
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={4}>
        <Sample />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Sample />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Sample />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Sample />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Sample />
        </Grid>
        </Grid>
    </>
  );
}

export default App;
