import React from 'react';
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
}));
// const NewsLine = () => {
// const [title, setTitle] = useState('');
// const [date, setDate] = useState();
// const [author, setAuthor] = useState('');
// const [news, setNews] = useState('');
// }

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{backgroundColor: "#D9D6D2"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            120 p.
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <div style={{display:'flex', justifyContent: 'space-around'}}>
          <p>Date</p>
          <p>Author name</p>
          </div>
        }
        

      />

      <CardContent>

        <Typography variant="body2" color="textSecondary" component="p" className="cardTitle">
        Belarusian regime’s thugs shut down Imaguru, the country’s key startup hub
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <a href="#" className="ButtonHover"><Button size="small">121 Comments</Button></a>
       <a href="#" className="ButtonHover Button"><Button size="small">Go to the News</Button></a>
        <IconButton aria-label="share" className="iconButton">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
