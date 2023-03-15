import { Alert, Divider, Slider, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import "./Style.scss";
import { ImCross } from "react-icons/im";
export function RightPannel(props: {
  userList: Array<{ id: string; name: string; level: number }>;
  setOpenSnackbarError: Function;
  setSnackbarErrorMessage: Function;
}) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [setArray, setSetArray] = useState(
    Array<{ set: number; point1: number; point2: number }>()
  );
  const [simulationArray, setSimulationArray] = useState(
    Array<{ winner: string }>()
  );

  const Simulate = () => {
    if (!player1Name || !player2Name) {
      props.setOpenSnackbarError(true);
      props.setSnackbarErrorMessage("Players's names must be full.");
      return;
    }
    if (!props.userList.find((item) => item.name == player1Name)) {
      props.setOpenSnackbarError(true);
      props.setSnackbarErrorMessage("First player not found.");
      return;
    }
    if (!props.userList.find((item) => item.name == player2Name)) {
      props.setOpenSnackbarError(true);
      props.setSnackbarErrorMessage("Second player not found.");
      return;
    }

    const tmpArray = [];

    for (let index = 0; index < 150; index++) {
      const firstPlayer = props.userList.find(
        (item) => item.name == player1Name
      )!;
      const secondPlayer = props.userList.find(
        (item) => item.name == player2Name
      )!;

      if (firstPlayer.level > secondPlayer.level) {
        const levelDiff = firstPlayer.level - secondPlayer.level;

        if (Math.random() * 9 + 1 <= levelDiff)
          tmpArray.push({ winner: player1Name, player: 1 });
        else tmpArray.push({ winner: player2Name, player: 2 });
      } else if (firstPlayer.level < secondPlayer.level) {
        const levelDiff = secondPlayer.level - firstPlayer.level;

        if (Math.random() * 9 + 1 <= levelDiff)
          tmpArray.push({ winner: player2Name, player: 2 });
        else tmpArray.push({ winner: player1Name, player: 1 });
      } else {
        if (Math.random() * 9 + 1 <= 5)
          tmpArray.push({ winner: player1Name, player: 1 });
        else tmpArray.push({ winner: player2Name, player: 2 });
      }
    }
    setSimulationArray(tmpArray);
  };

  const Calculate = () => {
    if (!simulationArray.length) {
      props.setOpenSnackbarError(true);
      props.setSnackbarErrorMessage("Simulate first");
      return;
    }

    axios
      .post("http://localhost:5001/game/calculate", simulationArray)
      .then((response) => {
        setOpenModal(true);
        setSetArray(response.data);
      })
      .catch((error) => {
        props.setOpenSnackbarError(true);
        props.setSnackbarErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <div className="SelectPlayerContainer">
        <div className="SelectPlayerItem">
          <div>Player 1 name :</div>
          <input
            value={player1Name}
            onChange={(e) => {
              setPlayer1Name(e.target.value);
            }}
          />
        </div>
        <div className="SelectPlayerItem">
          <div>Player 2 name :</div>
          <input
            value={player2Name}
            onChange={(e) => {
              setPlayer2Name(e.target.value);
            }}
          />
        </div>
        <div className="SelectPlayerItem">
          <button onClick={Simulate}>Simulate</button>
          <button onClick={Calculate}>Send to back</button>
        </div>
      </div>
      <div className="SimulatePannel">
        {simulationArray.map((item, index) => {
          return (
            <div key={index.toString()}>{`Point ${index + 1} : remporté par ${
              item.winner
            }`}</div>
          );
        })}
      </div>
      {openModal ? (
        <div className="modal">
          <div className="DisplaySetContainer">
            <div className="CrossContainer" onClick={() => setOpenModal(false)}>
              <ImCross className="CrossIcon" />
            </div>
            <div className="DisplaySet">
              <div className="SetItem">
                <div></div>
                <div>{player1Name}</div>
                <div>{player2Name}</div>
              </div>
              {setArray.map((item, index) => {
                if (index == setArray.length - 1) {
                  if (
                    (item.point1 >= 4 || item.point2 >= 4) &&
                    item.point1 == item.point2
                  )
                    return (
                      <div key={item.set} className="SetItem">
                        <div>{`Current set`}</div>
                        <div>{40}</div>
                        <div>{40}</div>
                      </div>
                    );
                  else if (item.point1 >= 4 || item.point2 >= 4)
                    return (
                      <div key={item.set} className="SetItem">
                        <div>{`Current set`}</div>
                        <div>{item.point1 > item.point2 ? "AV" : "-"}</div>
                        <div>{item.point1 < item.point2 ? "AV" : "-"}</div>
                      </div>
                    );

                  const pointArray = [0, 15, 30, 40];
                  return (
                    <div key={item.set} className="SetItem">
                      <div>{`Current set`}</div>
                      <div>{pointArray[item.point1]}</div>
                      <div>{pointArray[item.point2]}</div>
                    </div>
                  );
                }
                return (
                  <div key={item.set} className="SetItem">
                    <div>{`Set ${item.set}`}</div>
                    <div>{item.point1}</div>
                    <div>{item.point2}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
