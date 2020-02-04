import React from "react";
import styled from "styled-components";
import {Link, Route } from "react-router-dom";

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
        <h1>(Parent Name) Chore Dashboard</h1>
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


      
    </div>
  );
};

export default DashBoard;
