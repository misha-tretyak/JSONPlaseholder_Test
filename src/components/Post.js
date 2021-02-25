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

const Post = (props) => {
    const [open, setOpen] = React.useState(false);
    const [post, setPost] = React.useState({});
    const [coments, setComents] = React.useState([]);
    const [user, setUser] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
        handleClose();
    }

    const handleDelete = () => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
    }
    
    const classes = useStyles();
    
    const params = queryString.parse(props.location.search);

    useEffect(() => {
        getPost();             
        getComents();
        getUser(); 
    }, []);

    const getPost = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/posts/' + params.id)
        .then((res) => {
           setPost(res.data);       
        });      
    }

    const getUser = () => {
        axios.get('https://jsonplaceholder.typicode.com/users/' + params.userId)
        .then((res) => {
           setUser(res.data);        
        });
    }

    const getComents = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments?postId=' + params.id)
        .then((res) => {
           setComents(res.data);        
        }); 
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
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label="Title"
                      value={post.title}
                      type="text"
                      fullWidth
                      onChange={
                        (e) => setPost({...post, title: e.target.value})
                      }
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      value={post.body}
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
                    <Button onClick={handleUpdate} color="secondary">
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
            </Grid>          
            <Grid container>  
                <Grid item sm>
                    <Card className={classes.card}>
                        <CardHeader
                            title={`Title : ${post.title}`}
                        />
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {post.body}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {"User: " + user.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>                     
            </Grid>
            <div className={classes.card}>
                <Button variant="outlined" color="secondary" onClick={handleClickOpen} style={{marginRight: '10px'}}>
                    Edit Post
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleDelete}>
                    Delete Post
                </Button>             
                <Typography variant="h4" gutterBottom style={{marginTop: "20px"}}>
                    Comments
                </Typography>
            </div>
            
            {coments && coments.map((coment) => 
                <Grid container wrap="nowrap" spacing={2} key={coment.id} className={classes.card}>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{coment.name}</h4>
                    <p style={{ textAlign: "left" }}>
                      {coment.body}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      {coment.email}
                    </p>
                  </Grid>
                </Grid>
            )}            
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
  }))(Post);