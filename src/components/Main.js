/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { Button } from '@material-ui/core/';
import AppBar from "./AppBar";
import { CircularProgress, Typography } from '@material-ui/core';

const Main = (props) => {
    const [state, setState] = useState({isLoading: true});

    useEffect(() => {
        if (props.People.length < 1) {
            getPeoplePage();
        } else {
            setState({ isLoading: false }); 
        }
    }, []);

    const getPeoplePage = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
           setState({ isLoading: false });
           props.onFetchPeople(res.data);        
        })        
    }

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
             filter: true,
             sort: true,
             display: false,
            }
        },
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
          display: true,
         }
        },
        {
         name: "username",
         label: "Username",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "email",
         label: "Email",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "address",
         label: "Address",
         options: {
          filter: true,
          sort: false,
          display: true,
          customBodyRender: (value) => (
            <Typography>
              {value.street}
            </Typography>
          )
         }
        },
        {
         name: "phone",
         label: "Phone",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "website",
         label: "Website",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "company",
         label: "Company",
         options: {
          filter: true,
          sort: false,
          display: true,
          customBodyRender: (value) => (
            <Typography>
              {value.name}
            </Typography>
          )
         }
        },
        {
            name: "posts",
            label: "Posts",
            options: {
             filter: true,
             sort: false,
             display: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                <Button variant="outlined" color="primary" onClick={() => {
                    props.history.push("/user/posts?userId=" + tableMeta.rowData[0])
                }}>
                    Posts
                </Button>
             )
            }
           },
       ];
       
       const options = {
        searchBox: true,
        filterType: 'dropdown',
        responsive: 'vertical',
       };

    return (
        <div>
            <AppBar />
            <div style={{width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px'}}>
            <MUIDataTable
                title={
                <Typography variant="h6">
                    People list
                    {state.isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                </Typography>
                }
                data={props.People}
                columns={columns}
                options={options}                
            />
            </div>            
        </div>
    )
}

export default connect((state) => ({
    People: state.People,
  }),
  (dispatch) => ({
    onFetchPeople: (value) => {
      dispatch({ type: "PEOPLE", payload: value });
    },
  })
  
  )(Main);