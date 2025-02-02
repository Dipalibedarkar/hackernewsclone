import { useState, useEffect } from 'react'
import './Navbar.css'
import Axios from 'axios'
import logo from './Y_Combinator_logo.png'
import Content from './Content'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Backdrop, CircularProgress } from '@material-ui/core';
import Footer from './Footer'
import MediaCard from './AboutUs';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Searchbar() {
  const classes = useStyles();
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [search, setSearch] = useState('?tags=front_page')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(15)
  const [fixResults, setFixResults] = useState(15)
  const [about, setAbout] = useState(false)
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 300000);
    return () => clearInterval(interval);
  }, [search, fixResults, page])

  const fetchData = async () => {
    setAbout(false)
    setLoading(true)
    await Axios.get(`https://hn.algolia.com/api/v1/search${search}&hitsPerPage=${fixResults}&page=${page}`)
      .then(response => setData(response.data.hits))
      .catch(error => alert(error))
    /* setTimeout(console.log(data), 200) */
    setLoading(false)
  }

  const changeInput = () => {
    setSearch(`?query=${input}&tags=story`)
  }

  const searchingFunc = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      changeInput()
      event.currentTarget.value = ""
    }
  }

  const setResultNum = () => {
    if ((parseInt(results) == results) && results > 0 && results <= 100) {
      setFixResults(results.trim())
    }
  }

  const changeAbout = () => {
    setAbout(!about)
  }

  const showComments = (objID) => {
    setSearch(`?tags=comment,story_${objID}`)
  }

  const changePage = (page) => {
    setPage(page-1)
  }


  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" id="theNavBar">
          <Toolbar>
            <img src={logo} className="logo" onClick={() => {setSearch('?tags=front_page')}} />
            <h2 onClick={() => {setSearch('?tags=front_page')}}>
              Home
          </h2>
            <h2 onClick={() => {setSearch('_by_date?tags=(story,poll)')}}>
              New
          </h2>
            <h2 onClick={() => {setSearch('?query=&tags=story')}}>
              Best of All Time
          </h2>
            <div className={classes.search}>
              <InputBase
                placeholder="Results per page"
                onChange={((e) => setResults(e.target.value))}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button class="amountButton"variant="outline-info" onClick={setResultNum}>Set Amount</Button>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={searchingFunc}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button class="searchButton"variant="outline-info" onClick={changeInput}>Search</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <br />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {about ? <MediaCard /> :
        <Content data={data} loading={loading} showComments={showComments} changePage={changePage} />
        }
      <Footer changeAbout={changeAbout} />
    </>
  );
}

export default Searchbar;
