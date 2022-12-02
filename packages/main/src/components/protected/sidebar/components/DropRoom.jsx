import React, { useState, useEffect } from "react";
import styles from "../styles/Drop.module.css";
import ToggleSwitch from "./ToggleSwitch";
import { BsToggleOff } from "react-icons/bs";
import GrCircleAlert from "react-icons/gr";
import axios from "axios";
const DropRoom = props => {
  const id = JSON.parse(localStorage.getItem("userData"));
  const _id = id.user._id;
  const token = id.token;
  console.log(id.token);
  const [formState, setFromState] = useState({
    owner: _id,
    description: "",
    name: "",
    makeChannelPrivate: false,
    share: false
  });

  const { description, name, makeChannelPrivate, share } = formState;

  const handleOnChange = (e, type) => {
    setFromState({
      ...formState,
      [type]: e.target.value
    });
    // console.log(e.target.value);
  };

  const createChannel = e => {
    e.preventDefault();
    formState.private = formState.makeChannelPrivate;
    delete formState.makeChannelPrivate;
    delete formState.share;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formState),
      mode: "cors"
    };

    fetch(`https://channels.zuri.chat/v1/${_id}/channels`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(e => console.log(e));
  };
  return props.trigger ? (
    <div
      className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.droproom__overlay} `}
    >
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.droproom}`}
      >
        {props.children}
        <div
          className={`w-100 d-flex flex-row justify-content-between align-items-center`}
        >
          <h1 className={`dispay-1`}>Create a channel</h1>
          <h1 onClick={() => props.setTrigger(false)}>x</h1>
        </div>
        <p className={`w-100 d-flex flex-wrap align-items-start `}>
          Channels are where your team communcicates. They're best when
          organized around a topic -- #marketing, for example.
        </p>
        <form
          action=""
          className={`w-100 mt-3 mb-3 d-flex flex-column justify-content-between align-items-start`}
        >
          <div className={`w-100 d-flex flex-column  `}>
            <span className={`w-100`}>
              <label>Name</label>
              <input
                className={`w-100`}
                text="text"
                placeholder="# e.g, plan-budget"
                value={name}
                onChange={e => handleOnChange(e, "name")}
                required
              />
            </span>
            <span className={`w-100`}>
              <label>
                Description <span>(optional)</span>
              </label>
              <input
                className={`w-100`}
                type="text"
                value={description}
                onChange={e => handleOnChange(e, "description")}
              />
              <label>
                <span>What's this channel about?</span>
              </label>
            </span>
          </div>
          <div
            className={`w-100 mt-10 d-flex flex-column justify-content-between align-items-start`}
          >
            <div className={`w-100 d-block ${styles.droproom__private}`}>
              <h4>Make Private</h4>
              <span className={`w-100 d-flex flex-row justify-content-between`}>
                <p className={`w-60`}>
                  When a channel is set to private, it can only be viewed or
                  joined by invitation
                </p>
                <ToggleSwitch
                  label="Accept"
                  value={makeChannelPrivate}
                  onChange={() => {
                    setFromState({
                      ...formState,
                      makeChannelPrivate: !makeChannelPrivate
                    });
                  }}
                />
              </span>
            </div>
            <div
              className={`w-100 d-flex flex-row align-items-center ${styles.droproom__footer}`}
            >
              <span className={`w-100 d-flex align-items-center mr-10`}>
                <input
                  className={`mr-10`}
                  type="checkbox"
                  value={share}
                  onChange={() => {
                    setFromState({
                      ...formState,
                      share: !share
                    });
                  }}
                />
                <label className={`${styles.label}`}>
                  Share outside your workspace
                </label>
              </span>
              {/* <GrCircleAlert /> */}
              <button onClick={e => createChannel(e)}> Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default DropRoom;
