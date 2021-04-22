import { Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import { Pagination } from '@material-ui/lab';
import '../App.css';
import {useState} from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        minHeight: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(0deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
        
      },
      
}));

function Content({ loading, data, showComments, changePage }) {
    const [selectedPage, setSelectedPage] = useState(1)
    const classes = useStyles();

    const calcDate = (time) => {
        const event = new Date(time)
return(event.toLocaleDateString('en-US', {
                hour: 'numeric',
                minute: 'numeric'
              }))
    }
    const handlePageChange = (event, value) => {
        setSelectedPage(value)
        changePage(value)
    }
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <>
        {loading ? (
    <p className="loading">Loading... please stand by...</p>
) : ( data.length==0 ? (
        <p className="loading" onClick={() => handlePageChange(1, 1)}>Sorry, we couldn't find what you were looking for :-( <br/>
        Click here to return to Page 1 :-)</p>
    ):(
    <Grid container spacing={2} className={classes.gridContainer}>
            {data.map((e) => (
                <><Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.root} style={{ backgroundColor: "#D9D6D2" }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {e.points}</Avatar>
                            }
                            subheader={
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <p>{calcDate(e.created_at)}</p>
                                    <p>{e.author}</p>
                                </div>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" className="cardTitle">
                                {e.title ?
                                    <p>{e.title}</p> :
                                    <p>{decodeHtml(e.comment_text)}</p>
                                }
                            </Typography>
                        </CardContent>
                        {!e.title ? '' : <CardActions disableSpacing>
                            <a href="#" className="ButtonHover"><Button size="small" onClick={() => showComments(e.objectID)} >Comments: {e.num_comments}</Button></a>
                            <a href={e.url} target="_blank" className="ButtonHover Button"><Button size="small">Go to the News</Button></a>
                            <IconButton aria-label="share" onClick={()=> alert(e.url)} className="iconButton">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>}
                    </Card>
                </Grid>
                </>
            ))
            }
            <Pagination count={10} page={selectedPage} onChange={handlePageChange} style={{marginLeft: 'auto', marginRight: 'auto'}} color="primary" />
        </Grid>))}
        
        </>
    );
}

export default Content;