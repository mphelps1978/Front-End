import React from "react";
import styled from "styled-components";
import {Link, Route } from "react-router-dom";

import ChoreList from './ChoreList'
import Scores from './Scores'

const DashBoard = props => {

  const DashBoardNav = styled.nav`
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    margin: 20px;


  `;

  const DashBoardHeader = styled.header`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  margin: 20px;


`;

  return (
    <div>
      <DashBoardHeader>
        <h1>(Parent Name) Parent Dashboard (adding menu items on this component)</h1>
      </DashBoardHeader>
      <DashBoardNav>
        <p>Child</p>
        <p>Child</p>
        <p>Child</p>
        <p>Child</p>
      </DashBoardNav>

      <section>
        <p>Child</p>
        <p>Child</p>
        <p>Child</p>
        <p>Child</p>
      </section>
      <Scores />
      <ChoreList />



    </div>
  );
};

export default DashBoard;
