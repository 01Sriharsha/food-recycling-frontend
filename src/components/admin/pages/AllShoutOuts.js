import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteShoutOut, getAllShoutOuts } from "../../../api/adminService";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";
import RespondShoutOut from "../../donor/pages/RespondShoutOut";
import ViewDonorDetails from "../layout/ViewDonorDetails";

export default function AllShoutOuts() {
  const context = CustomContext();

  const [shoutouts, setShoutouts] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const [showDonor, setShowDonor] = useState(false);

  const toggleDonorDetails = () => setShowDonor(!showDonor);

  const loadAllShoutOuts = () =>
    getAllShoutOuts()
      .then((res) => setShoutouts(res.data))
      .catch((err) => console.log(err));

  useEffect(() => {
    loadAllShoutOuts();
  }, []);

  const handleDelete = (id) => {
    toast
      .promise(
        deleteShoutOut(id),
        {
          pending: "Deleting....",
          success: "Shoutout removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = shoutouts.filter((shoutout) => shoutout.id !== id);
        setShoutouts(newArr);
      })
      .catch((err) => {
        console.log(
          err.response.data ? err.response.data : "Failed to delete shoutout",
          TOAST_PROP
        );
      });
  };

  if (shoutouts.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        {context.user === "admin" || context.user.user === "ngo" ? (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <h5>
              No Shout outs &nbsp;
              <Link to="/admin/shoutout">Click Here</Link> to add new shoutout
            </h5>
          </div>
        ) : (
          <h4>No Shoutouts to respond...!</h4>
        )}
      </div>
    );
  }
  return (
    <Container>
      <h1 className="text-center fw-semibold text-primary">All Shoutouts</h1>
      <Table>
        <thead>
          <tr className="text-center text-capitalize">
            <th>Shoutout Id</th>
            <th>Food Type</th>
            <th>Food Item</th>
            <th>Quantity</th>
            {(context.user === "admin" || context.user.user === "ngo") && (
              <th>Donor</th>
            )}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(context.user !== "admin" || context.user.user !== "ngo"
            ? shoutouts.filter((shoutout) => shoutout.responded === false)
            : shoutouts
          ).map((shoutout) => (
            <tr key={shoutout.id} className="text-center text-capitalize">
              <td className="fw-semibold">{shoutout.id}</td>
              <td>{shoutout.foodType}</td>
              <td>{shoutout.foodItem}</td>
              <td>
                {shoutout.quantity}{" "}
                {shoutout.foodType === "Diary" ? "ltr" : "Kg"}
              </td>
              {(context.user === "admin"  || context.user.user === "ngo")&& (
                <td>
                  {shoutout.donor?.name ? (
                    <Button
                      variant="link"
                      className="text-capitalize p-0 text-warning"
                      onClick={toggleDonorDetails}
                    >
                      {shoutout.donor?.name}
                    </Button>
                  ) : (
                    "-"
                  )}

                  <ViewDonorDetails
                    show={showDonor}
                    toggle={toggleDonorDetails}
                    donorObj={shoutout.donor}
                  />
                </td>
              )}
              <td>
                {(context.user === "admin" || context.user.user === "ngo") ? (
                  <Button
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => handleDelete(shoutout.id)}
                  >
                    Delete
                  </Button>
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <Button className="btn-sm" onClick={toggle}>
                      Donate
                    </Button>

                    <RespondShoutOut
                      show={show}
                      toggle={toggle}
                      shoutoutObj={shoutout}
                      loadAllShoutOuts={loadAllShoutOuts}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
