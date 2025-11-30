import API from "../api";

export default function RequestList({ requests, reload }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleApprove = async (id) => {
    try {
      await API.put(`/requests/${id}/approve`);
      alert("Request approved!");
      reload();
    } catch (err) {
      alert("Failed to approve request");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/requests/${id}/reject`);
      alert("Request rejected!");
      reload();
    } catch (err) {
      alert("Failed to reject request");
    }
  };

  const handleClose = async (id) => {
    try {
      await API.put(`/requests/${id}/close`);
      alert("Request closed!");
      reload();
    } catch (err) {
      alert("Failed to close request");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => {
          console.log("Request status:", req.status); // <--- DEBUG LOG

          return (
            <div
              key={req.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 6,
              }}
            >
              <p><b>Title:</b> {req.title}</p>
              <p><b>Description:</b> {req.description}</p>
              <p><b>Status:</b> {req.status}</p>
              <p><b>Created By:</b> {req.creator?.name}</p>
              <p><b>Assigned To:</b> {req.assignee?.name}</p>

              {/* MANAGER: show buttons if status is PENDING_APPROVAL */}
              {user.role === "MANAGER" && req.status === "PENDING_APPROVAL" && (
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => handleApprove(req.id)}
                    style={{ marginRight: 10 }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* EMPLOYEE: show CLOSE button only when request is APPROVED */}
              {user.role === "EMPLOYEE" &&
                req.assignedTo === user.id &&
                req.status === "APPROVED" && (
                  <button
                    style={{
                      marginTop: 10,
                      backgroundColor: "green",
                      color: "white",
                    }}
                    onClick={() => handleClose(req.id)}
                  >
                    Close Request
                  </button>
                )}
            </div>
          );
        })
      )}
    </div>
  );
}
