/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button,
    CardActions
} from '@material-ui/core/';
import AppBar from "./AppBar";

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(2),
        height: '90%',
    }
}))


const AllPosts = (props) => {

    const classes = useStyles();

    useEffect(() => {
        if (props.AllPosts < 1) {
            getPosts();
        }
    }, []);

    const getPosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
           props.onFetchPosts(res.data);        
        })        
    }
   
    return (
        <div>            
            <AppBar />
            <Grid container >
            {props.AllPosts.map(elem => (
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
    AllPosts: state.AllPosts,
    People: state.People,
  }),
  (dispatch) => ({
    onFetchPosts: (value) => {
      dispatch({ type: "ALL_POSTS", payload: value });
    },
  }))(AllPosts);