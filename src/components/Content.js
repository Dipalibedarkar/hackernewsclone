import './Navbar.css'
import { Grid } from '@material-ui/core';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        minHeight: 250,
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

function Content({ loading, data }) {
    const classes = useStyles();

    const calcDate = (time) => {
        const event = new Date(time)
return(event.toLocaleDateString('en-US', {
                hour: 'numeric',
                minute: 'numeric'
              }))
    }

    return (
        <>
        {loading ? (
    <p className="loading">Loading... please stand by...</p>
) :
(<Grid container spacing={2} className={classes.gridContainer}>
            {data.map((e) => (
                <><Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.root} style={{ backgroundColor: "#D9D6D2" }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {e.points}</Avatar>
                            }
                            /* action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            } */
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
                                    `${e.story_title ? <p>{e.story_title}</p> : "No Title :/"}`
                                }
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <a href="#" className="ButtonHover"><Button size="small">Comments: {e.num_comments}</Button></a>
                            <a href={e.url} target="_blank" className="ButtonHover Button"><Button size="small">Go to the News</Button></a>
                            <IconButton aria-label="share" onClick={()=> alert(e.url)} className="iconButton">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                </>
            ))
            }
        </Grid>)}
        </>
    );
}

export default Content;


{/* <div className="App">
{loading ? (
    <p className="loading">Loading... please stand by...</p>
) : (
    <>
        {data.map((e) => (
            <>
                <p><b>{e.title ?
                    <a target="_blank" href={e.url}>{e.title}</a> :
                    `${e.story_title ? <a target="_blank" href={e.story_url}>{e.story_title}</a> : "No Title :/"}`
                }
                </b></p>
                <p>{e.points ? `Points: ${e.points}` : "No Points :("}</p>
                <p>posted by: {e.author} | created: {e.created_at}</p>
            </>
        ))
        }
    </>)
}

</div> */}

/* {data.map((e) => (
    <>
        <p>{e.title}</p>
    </>
))
} */