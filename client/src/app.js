import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Grid, CircularProgress } from "@material-ui/core";
import "./app.css";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const socket = socketIOClient("http://localhost:4001");
    socket.on("data1", (data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <h1> Data Acquisition Using Scoket.io</h1>
      {!data.length ? (
        <CircularProgress />
      ) : (
        <div>
          <Grid container alignItems="stretch" spacing={3}>
            {data.map((dat) => (
              <Grid
                key={dat._id}
                item
                xs={12}
                sm={4}
                md={4}
                className="grid-item"
              >
                {dat}
              </Grid>
            ))}
          </Grid>
          <br></br>

          <button
            onClick={() => {
              setData(Array.from({ length: 9 }, () => 1000));
            }}
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
};

export default App;
