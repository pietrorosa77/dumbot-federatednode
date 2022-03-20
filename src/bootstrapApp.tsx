import { Grommet } from "grommet";
import React from "react";
import ReactDOM from "react-dom";
import { BotTheme } from "./dumbot-theme";
import CustomUserComponent from "./DumbotRemoteComponent";

const App = () => (
  <Grommet full theme={BotTheme}>
    <h1>My React and TypeScript App!! {new Date().toLocaleDateString()}</h1>
    <CustomUserComponent
      onExitNode={(value: any, port: string) => {
        console.log("GETTINMG USER ANSWER FROM BOT", value, port);
      }}
      onCallHost={async () => {
        const res = await fetch("https://gorest.co.in/public/v1/users");
        return await res.json();
      }}
      theme={BotTheme}
      nodeID="2232323"
      onSetVariable={(name: string, value: any) => {
        console.log("SETTING VARIABLE", name, value);
      }}
      ports={{
        default: "default",
        exit0: "exit0",
      }}
      variables={{
        test: "12244",
      }}
      childText="www"
      csrfToken="ssss"
    />
  </Grommet>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
