import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [detail, setdetail] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      // const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      // const doc = await getDocs(q);
      // const data = doc.docs[0].data();
      // setName(data.name);
      const dbRef = ref(getDatabase());
      get(child(dbRef, `userDataRecords`)).then((snapshot) => {
        if (snapshot.exists()) {
          setdetail(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div>
      <div className="Navbar">
        {/* <div>{name}</div> */}
        <div style={{ fontSize: "1.64rem", fontWeight: 500 }}>Dashboard</div>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button></div>
      </div>
      <div className="dashboard__container">
        {
          Object.keys(detail).map((key) => {
            const { FullName, TestInvitationCode, email, image } = detail[key];
            return (
              <div key={key} className="Details">
                <div>
                  <p>Candidate FullName = {FullName}</p>
                  <p>TestInvitationCode = {TestInvitationCode}</p>
                  <p>Candidate's email = {email}</p>
                </div>
                <div style={{ display: "flex", margin: "0 2rem", overflow: "auto" }}>
                  {
                    Object.keys(image).map((key) => {
                      return (
                        <div className="WebPhotos">
                          <img alt="webcam pic" style={{ width: "200px" }} src={image[key].imageSrc} />
                          <div>{image[key].timeStamp}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
export default Dashboard;