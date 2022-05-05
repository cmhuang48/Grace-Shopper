import * as React from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

import { deleteUser } from "../store";

const useStyles = makeStyles({ root: { minWidth: "10px" } });

const AllUsers = ({ users, destroy }) => {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Zip</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Card Name</TableCell>
              <TableCell align="right">Card Number</TableCell>
              <TableCell align="right"></TableCell>
              {/*<TableCell align="right"></TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row" key={user.id}>
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.isAdmin.toString()}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.firstName}</TableCell>
                  <TableCell align="right">{user.lastName}</TableCell>
                  <TableCell align="right">
                    {user.address1}
                    <br />
                    {user.address2}
                  </TableCell>
                  <TableCell align="right">{user.city}</TableCell>
                  <TableCell align="right">{user.state}</TableCell>
                  <TableCell align="right">{user.zip}</TableCell>
                  <TableCell align="right">{user.country}</TableCell>
                  <TableCell align="right">{user.cardName}</TableCell>
                  <TableCell align="right">
                    {"XXXXXXXXXXXX" + user.cardNumber.slice(-4)}
                  </TableCell>
                  <TableCell>
                    <Button
                      classes={classes}
                      onClick={() => destroy(user)}
                      style={{ color: "red" }}
                    >
                      X
                    </Button>
                  </TableCell>
                  {/*<TableCell>
										<Button classes={classes}>
											&#x270D;
										</Button>
								</TableCell>*/}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mapState = ({ users }) => ({ users });

const mapDispatch = (dispatch, { history }) => {
  return {
    destroy: (user) => {
      dispatch(deleteUser(user, history));
    },
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
