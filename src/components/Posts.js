/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button,
    CardActions,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select
} from '@material-ui/core/';
import AppBar from "./AppBar";

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(2),
        height: '90%',
    },
    button: {
        marginTop:theme.spacing(2),
    }
}));

const Posts = (props) => {
    const [open, setOpen] = React.useState(false);
    const [post, setPost] = React.useState({userId: 1, body: '', title: ''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        axios.post('https://jsonplaceholder.typicode.com/posts', post);
        getPosts();
        handleClose();
    }
    
    const classes = useStyles();
    
    const params = queryString.parse(props.location.search);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + params.userId)
        .then((res) => {
           props.onFetchPosts(res.data);        
        })        
    }
   
    return (
        <div>
            <AppBar />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.button}>
                <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                    Add Post
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label="Title"
                      type="text"
                      fullWidth
                      onChange={
                        (e) => setPost({...post, title: e.target.value})
                      }
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="body"
                      label="Text"
                      type="text"
                      fullWidth
                      onChange={
                        (e) => setPost({...post, body: e.target.value})
                      }
                    />
                    <Select
                      native
                      onChange={
                        (e) => setPost({...post, userId: e.target.value})
                      }
                      inputProps={{
                        name: 'id',
                        id: 'id-native-simple',
                      }}
                    >
                    {props.People.map((user) => <option value={user.id}>{user.name}</option>)}
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleCreate} color="secondary">
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
            </Grid>           
            <Grid container>            
            {props.Posts.map(elem => (
                <Grid item sm={4} key={elem.id}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={`Title : ${elem.title}`}
                        />
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {elem.body}
                            </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary" onClick={() => {
                              props.history.push(`/post?id=${elem.id}&userId=${elem.userId}`)
                          }}>
                            Details
                          </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}         
            </Grid>
        </div>        
    )
}

export default connect((state) => ({
    Posts: state.Posts,
    People: state.People,
  }),
  (dispatch) => ({
    onFetchPosts: (value) => {
      dispatch({ type: "POSTS", payload: value });
    },
  }))(Posts);