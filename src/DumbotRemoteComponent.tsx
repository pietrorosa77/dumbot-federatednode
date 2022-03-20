import { Box, Button, Spinner } from "grommet";
import { Trash } from "grommet-icons";
import _ from "lodash";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IBotRemoteNodeProps {
  ports: { [key: string]: string };
  nodeID: string;
  theme: any; //grommet theme definition
  variables: {
    [key: string]: any;
  };
  onExitNode: (value: any, port: string) => void;
  onCallHost:  ((hostFunctionName: string, parameters: {
    [key: string]: any;
}) => Promise<any>) | undefined;
  onSetVariable: (name: string, value: any) => void;
  csrfToken: string;
  [key: string]: any; // user defined props passed
}

const ActionButton = styled(Button)<any>`
  width: 40px;
  background-color: ${(props) => {
    return props.theme.global.colors[props.bgColor || "botBubbleColor"];
  }};
  border: ${(props) =>
    !props.plain
      ? `2px solid ${
          props.theme.global.colors[props.fontColor || "botFontColor"]
        }`
      : "none"};
  border-radius: 50%;
  color: ${(props) =>
    props.theme.global.colors[props.fontColor || "botFontColor"]};
  svg {
    fill: ${(props) =>
      props.theme.global.colors[
        props.active ? "botFocusColor" : props.fontColor || "botFontColor"
      ]};
    stroke: ${(props) =>
      props.theme.global.colors[
        props.active ? "botFocusColor" : props.fontColor || "botFontColor"
      ]};
  }

  &: hover
    ${(props) =>
      props.disabled
        ? undefined
        : `
  {
    transform: scale(1.1);
    transition: 0.3s ease-out;
    box-shadow: ${
      props.noOutline
        ? "none"
        : `0 0 2px 2px ${props.theme.global.colors["botFocusColor"]}`
    };
    color: ${props.theme.global.colors["botFocusColor"]};
    opacity: 0.9;
    svg {
      fill: ${props.theme.global.colors["botFocusColor"]};
      stroke: ${props.theme.global.colors["botFocusColor"]};
    }
  }
  `};
`;

const ChildComponent = (props: { loading: boolean; text: string }) => {
  return (
    <Box background="bars" pad="xlarge">
      {props.loading ? (
        <Spinner size="medium" color="red" />
      ) : (
        <Box>{props.text || `I'm a child component`}</Box>
      )}
    </Box>
  );
};

export default function CustomUserComponent(
  props: IBotRemoteNodeProps
) {
  /* -- readonly -- */
  // lines in gray are readonly and you can't modify them.
  // the library imported are the ones yu can use for your component
  // this is just an example on what you can do
  const [loading, setLoading] = useState(true);
  const res = _.chunk(["a", "b", "c", "d"], 2);
  const uuid = nanoid();
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);
  const onUserActioncall = () => {
    props.onExitNode({ test: 123, res, uuid }, props.ports.exit0);
  };
  return (
    <Box background="brand" pad="xlarge">
      {loading ? (
        <Spinner size="medium" />
      ) : (
        <Button label="test remote prop" primary onClick={onUserActioncall} />
      )}
      <ActionButton
        icon={<Trash size="small" />}
        onClick={onUserActioncall}
        size="small"
        bgColor="bars"
        tip={props.variables.question1 || "test"}
      />
      <ChildComponent loading={loading} text={props.childText} />
    </Box>
  );
}
