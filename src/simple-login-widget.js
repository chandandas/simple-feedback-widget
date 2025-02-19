"use client";

import React, { Component } from "react";

class SimpleLoginWidget extends Component {
  constructor(props) {
    super(props);
    
  }

  
  render() {
    
    return (
      <form class="form-signin">
          <h2 class="text-center">ST CE Monitor</h2>
          <label for="inputUserID" class="sr-only">User ID</label>
          <input type="text" id="inputUserID" class="form-control" placeholder="User ID" required autofocus/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
          <button class="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
      </form>
   
    );
  }
}

export default SimpleLoginWidget;
